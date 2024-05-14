import z from "zod";

export const postCommentSchema = z.object({
  body: z.object({
    userId: z.number().nonnegative(),
    newContent: z.string(),
  }),
});

export const likeCommentSchema = z.object({
  body: z.object({
    commentId: z.number().nonnegative(),
    newLikes: z.number().nonnegative(),
  }),
});
