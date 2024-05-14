import { db } from "@/db/config";
import { eq } from "drizzle-orm";
import type { NextApiRequest, NextApiResponse } from "next";

import { comments } from "@/db/schema";
import { prepareResponse } from "@/utils";
import { APIResponseType } from "@/utils/types";
import { validate } from "@/utils/schemaValidation";
import { likeCommentSchema } from "@/utils/zodSchemas";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponseType<null>>
) {
  try {
    const { commentId, newLikes } = req.body;

    await db
      .update(comments)
      .set({ likes: newLikes })
      .where(eq(comments.id, commentId));

    res
      .status(200)
      .json(
        prepareResponse(false, "Comments like updated successfully!", null)
      );
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error in fetching comments!",
      data: null,
    });
  }
}

export default validate(likeCommentSchema)(handler);
