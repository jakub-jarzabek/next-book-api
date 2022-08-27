import type { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";
import { connectToDatabase } from "../../../libs/db";
import { Book, BookSchema, ApiError, User } from "../../../dto";
import {SignJWT, jwtVerify, type JWTPayload} from 'jose';

const deleteBook = async (
  req: NextApiRequest,
  res: NextApiResponse<{ api_token: string } | ApiError>
) => {
  if (req.method === "POST") {
    try {
      const { db } = await connectToDatabase();
      const user =
        typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      const dbuser = (await db
        .collection("users")
        .findOne({ login: user.login })) as User;
      const match = await bcrypt.compare(user.password, dbuser.password)
        if (match) {
          const r = new SignJWT({}).setProtectedHeader({alg:'HS256',typ:'JWT'}).sign(new TextEncoder().encode(process.env.JWT_SECRET as string))
          const api_token = await r
          res.status(200).json({ api_token });
        } else {
          res.status(404).json({ error: "Not Found" });
        }
    } catch (error) {
      console.log(error)
      res.status(501).json({ error: "Internal server error" });
    }
  } else {
    res.status(404).json({ error: "Not Found" });
  }
};
export default deleteBook;
