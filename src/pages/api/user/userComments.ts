import { db } from "@/db/config";
import { eq, desc } from "drizzle-orm";
import type { NextApiRequest, NextApiResponse } from "next";

import { prepareResponse } from "@/utils";
import { comments, users } from "@/db/schema";
import { APIResponseType, CommentsWithUserName } from "@/utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponseType<CommentsWithUserName[] | null>>
) {
  try {
    const { userId } = req.body;

    const token = req.cookies["auth_token"];

    if (!token) {
      await db
        .update(users)
        .set({
          loggedIn: false,
        })
        .where(eq(users.id, userId));

      throw new Error("Auth token not found");
    }

    const userComments = await db
      .select({
        comments: {
          id: comments.id,
          content: comments.content,
          likes: comments.likes,
          userId: comments.userId,
          userName: users.userName,
        },
      })
      .from(comments)
      .leftJoin(users, eq(comments.userId, users.id))
      .where(eq(comments.userId, userId))
      .orderBy(desc(comments.id));

    if (!userComments) {
      throw new Error("User comments not found");
    }

    const finalComments = userComments.map((comm) => {
      return comm.comments;
    });

    res
      .status(200)
      .json(
        prepareResponse(
          false,
          "User comments fetched successfully!",
          finalComments as unknown as CommentsWithUserName[]
        )
      );
  } catch (error) {
    res
      .status(500)
      .json(prepareResponse(true, "Error in fetching user comments!", null));
  }
}
