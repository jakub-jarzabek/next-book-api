import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../libs/db";
import { Book, BookSchema, ApiError } from "../../../dto";
import { ObjectId } from "mongodb";

const getBook = async (
  req: NextApiRequest,
  res: NextApiResponse<Book | ApiError>
) => {
  if (req.method === "GET") {
    const { id } = req.query;
    const { db } = await connectToDatabase();
    try {
      const result = (await db
        .collection("books")
        .findOne({ _id: new ObjectId(id as string) })) as Book;
      res.status(200).json(result);
    } catch (error) {
      res.status(501).json({ error: "Internal server error" });
    }
  } else {
    res.status(404).json({ error: "Not found" });
  }
};
export default getBook;
