import type { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";
import { connectToDatabase } from "../../../libs/db";
import { Book, BookSchema, ApiError } from "../../../dto";
import { ObjectId } from "mongodb";
type Data = {
  login: string;
  password: string;
};
const deleteBook = async (
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean } | ApiError>
) => {
  if (req.method === "POST") {
    try {
      const { db } = await connectToDatabase();
      const user =
        typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
          db.collection("users").insertOne({
            login: user.login,
            password: hash,
          });
        });
      });

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(501).json({ error: "Internal server error" });
    }
  } else {
    res.status(404).json({ error: "Not Found" });
  }
};
export default deleteBook;
