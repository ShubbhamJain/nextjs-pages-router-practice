import cookie from "cookie";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { compare } from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/db/config";
import { users } from "@/db/schema";
import { prepareResponse } from "@/utils";
import { signInSchema } from "@/utils/zodSchemas";
import { validate } from "@/utils/schemaValidation";
import { APIResponseType, User } from "@/utils/types";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponseType<User | null>>
) {
  try {
    const { email, password } = req.body;

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      throw new Error("Incorect Credentials!");
    }

    await compare(password, user.password).catch((error) => {
      throw new Error("Incorect Credentials!");
    });

    await db
      .update(users)
      .set({
        loggedIn: true,
      })
      .where(eq(users.email, email));

    const token = jwt.sign(
      { id: user.id, userName: user.userName, email, loggedIn: true },
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

    res.status(201).json(
      prepareResponse(
        false,
        "User logged in successfully!",
        {
          id: user.id,
          email: user.email,
          userName: user.userName,
          loggedIn: true,
        } ?? null
      )
    );
  } catch (error: any) {
    res
      .status(500)
      .json(
        prepareResponse(
          true,
          error.message || "Error in signing in user!",
          null
        )
      );
  }
}

export default validate(signInSchema)(handler);
