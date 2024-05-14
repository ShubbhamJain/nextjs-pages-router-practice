import cookie from "cookie";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { genSalt, hash } from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/db/config";
import { users } from "@/db/schema";
import { prepareResponse } from "@/utils";
import { signUpSchema } from "@/utils/zodSchemas";
import { validate } from "@/utils/schemaValidation";
import { APIResponseType, User } from "@/utils/types";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponseType<User | null>>
) {
  try {
    const { userName, email, password } = req.body;

    const user = await db
      .select()
      .from(users)
      .where(eq(users.userName, userName));

    if (user.length) {
      throw new Error("User with same username already exists!");
    }

    const salt = await genSalt(10).catch((error: Error) => {
      throw new Error(error.message);
    });
    const hashedPwd = await hash(password, salt).catch((error: Error) => {
      throw new Error(error.message);
    });

    const newUser = await db.transaction(async (tx) => {
      const newUserId = await db
        .insert(users)
        .values({
          email,
          password: hashedPwd,
          userName,
        })
        .then((res) => res[0].insertId);

      const newUser = await db.query.users.findFirst({
        where: eq(users.id, newUserId),
        columns: {
          email: true,
          id: true,
          loggedIn: true,
          userName: true,
        },
      });

      return newUser;
    });

    const token = jwt.sign(
      { id: newUser?.id, userName, email, loggedIn: newUser?.loggedIn },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600,
        path: "/",
        sameSite: "strict",
      })
    );

    res
      .status(201)
      .json(
        prepareResponse(false, "Account successfully created!", newUser ?? null)
      );
  } catch (error: any) {
    res
      .status(500)
      .json(
        prepareResponse(
          true,
          error.message || "Error in signing up user!",
          null
        )
      );
  }
}

export default validate(signUpSchema)(handler);
