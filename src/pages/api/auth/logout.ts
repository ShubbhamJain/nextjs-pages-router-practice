import cookie from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

import { prepareResponse } from "@/utils";
import { APIResponseType } from "@/utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponseType<null>>
) {
  try {
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
