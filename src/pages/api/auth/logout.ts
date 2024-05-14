import cookie from "cookie";
import { eq } from "drizzle-orm";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/db/config";
import { users } from "@/db/schema";
import { prepareResponse } from "@/utils";
import { APIResponseType } from "@/utils/types";
import { logoutchema } from "@/utils/zodSchemas";
import { validate } from "@/utils/schemaValidation";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponseType<null>>
) {
  try {
    const { userId } = req.body;

    await db
      .update(users)
      .set({
        loggedIn: false,
      })
      .where(eq(users.id, userId));

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("auth_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(0), // Set the expiration date in the past
        sameSite: "strict",
        path: "/", // Make sure the path matches the path of the cookie you want to clear
      })
    );

    return res.json(
      prepareResponse(false, "User logged out successfully!", null)
    );
  } catch (error: any) {
    res
      .status(500)
      .json(
        prepareResponse(
          true,
          error.message || "Error in logging user out!",
          null
        )
      );
  }
}

export default validate(logoutchema)(handler);
