import { db } from "@/db/config";
import type { NextApiRequest, NextApiResponse } from "next";

import { comments } from "@/db/schema";
import { prepareResponse } from "@/utils";
import { APIResponseType } from "@/utils/types";
import { validate } from "@/utils/schemaValidation";
import { postCommentSchema } from "@/utils/zodSchemas";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponseType<null>>
) {
  try {
    const { newContent, userId } = req.body;

    await db.insert(comments).values({
      content: newContent,
      userId,
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

export default validate(postCommentSchema)(handler);
