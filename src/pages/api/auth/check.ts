import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/db/config";
import { users } from "@/db/schema";
import { prepareResponse } from "@/utils";
import { APIResponseType, User } from "@/utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponseType<User | null>>
) {
  try {
    const token = req.cookies["auth_token"];

    if (!token) {
      throw new Error("Token not found!");
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload & User;

    if (new Date(decoded.exp! * 1000) < new Date()) {
      await db
        .update(users)
        .set({
          loggedIn: false,
        })
        .where(eq(users.id, decoded.id));

      throw new Error("Auth token expired");
    }

    return res.json(
      prepareResponse(false, "User authenticated!", {
        id: decoded.id,
        email: decoded.email,
        userName: decoded.userName,
        loggedIn: decoded.loggedIn ?? true,
      })
    );
  } catch (error: any) {
    res
      .status(401)
      .json(
        prepareResponse(
          true,
          error.message || "Error in authenticating user!",
          null
        )
      );
  }
}
