import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../libs/db";
import { Book, BookSchema, ApiError } from "../../../../dto";
import { ObjectId } from "mongodb";

const updateBook = async (
  req: NextApiRequest,
  res: NextApiResponse<Book | ApiError>
) => {
  if (req.method === "PUT") {
    const { id } = req.query;
    const { db } = await connectToDatabase();
    const book = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    try {
      BookSchema.parse(book);
      const result = await db.collection("books").findOneAndUpdate(
        { _id: new ObjectId(id as string) },
        {
          $set: {
            title: book.title,
            author: book.author,
            release_date: book.release_date,
          },
        }
      );
      if (result.ok) {
        res.status(200).json({ ...book, _id: id });
      } else {
        res.status(502).json({ error: "Update failed" });
      }
    } catch (error) {
      console.log(error);
      res.status(501).json({ error: "Internal server error" });
    }
  } else {
    res.status(404).json({ error: "Not found" });
  }
};
export default updateBook;
