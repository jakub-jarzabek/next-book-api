import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../libs/db";
import { Book, BookSchema, ApiError } from "../../../dto";

const newBook = async (
  req: NextApiRequest,
  res: NextApiResponse<Book | ApiError>
) => {
  if (req.method === "POST") {
    const { db } = await connectToDatabase();
    try {
      const body =
        typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      BookSchema.parse(body);
      const book = await db.collection("books").insertOne(body);
      const returnObj: Book = { ...body, _id: book.insertedId };

      res.status(200).json(returnObj);
    } catch (error) {
      console.log(error);
      res.status(503).json({ error: "Invalid input data" });
    }
  } else {
    res.status(404).json({ error: "Not found" });
  }
};
export default newBook;
