import { db } from "@/db/config";
import { eq } from "drizzle-orm";
import type { NextApiRequest, NextApiResponse } from "next";

import { users } from "@/db/schema";
import { prepareResponse } from "@/utils";
import { userSchema } from "@/utils/zodSchemas";
import { validate } from "@/utils/schemaValidation";
import { APIResponseType, User } from "@/utils/types";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponseType<User | null>>
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

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      throw new Error("User not found");
    }

    res
      .status(200)
      .json(prepareResponse(false, "User fetched successfully!", user));
  } catch (error) {
    res
      .status(500)
      .json(prepareResponse(true, "Error in fetching user!", null));
  }
}

export default validate(userSchema)(handler);
