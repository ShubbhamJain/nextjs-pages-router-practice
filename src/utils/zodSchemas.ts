import z from "zod";

export const signUpSchema = z.object({
  body: z.object({
    userName: z.string(),
    email: z.string(),
    password: z.string(),
  }),
});

export const signInSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

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

export const userSchema = z.object({
  body: z.object({
    userId: z.number().nonnegative(),
  }),
});

export const logoutchema = z.object({
  body: z.object({
    userId: z.number().nonnegative(),
  }),
});
