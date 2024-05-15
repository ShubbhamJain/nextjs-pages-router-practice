import { db } from "@/db/config";
import { sql } from "drizzle-orm";
import type { NextApiRequest, NextApiResponse } from "next";

import { prepareResponse } from "@/utils";
import { APIResponseType, Comments } from "@/utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponseType<Comments[] | null>>
) {
  try {
    const fetchedComments = await db
      .execute(
        sql`
        SELECT 
          comments.id, 
          comments.content, 
          comments.likes, 
          comments.userId, 
          users.userName
        FROM 
          userComments AS comments
        JOIN 
          users ON comments.userId = users.id
        ORDER BY 
          comments.id DESC
      `
      )
      .then((res) => res[0]);

    res
      .status(200)
      .json(
        prepareResponse(
          false,
          "Comments fetched successfully!",
          fetchedComments as unknown as Comments[]
        )
      );
  } catch (error) {
    res
      .status(500)
      .json(prepareResponse(true, "Error in fetching comments!", null));
  }
}
