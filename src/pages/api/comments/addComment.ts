import { db } from "@/db/config";
import type { NextApiRequest, NextApiResponse } from "next";

import { comments } from "@/db/schema";
import { prepareResponse } from "@/utils";
import { APIResponseType } from "@/utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponseType<null>>
) {
  try {
    const { newContent } = req.body;

    await db.insert(comments).values({
      content: newContent,
    });

    res
      .status(200)
      .json(prepareResponse(false, "New Comment added successfully!", null));
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error in adding new comment!",
      data: null,
    });
  }
}
