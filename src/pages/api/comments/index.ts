import { db } from "@/db/config";
import type { NextApiRequest, NextApiResponse } from "next";

import { prepareResponse } from "@/utils";
import { APIResponseType, Comments } from "@/utils/types";
import { desc } from "drizzle-orm";
import { comments } from "@/db/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponseType<Comments[] | null>>
) {
  try {
    const fetchedComments = await db.query.comments.findMany({
      orderBy: [desc(comments.id)],
    });

    res
      .status(200)
      .json(
        prepareResponse(
          false,
          "Comments fetched successfully!",
          fetchedComments
        )
      );
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error in fetching comments!",
      data: null,
    });
  }
}