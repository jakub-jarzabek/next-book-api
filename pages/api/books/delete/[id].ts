import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../libs/db";
import { Book, BookSchema, ApiError } from "../../../../dto";
import { ObjectId } from "mongodb";

const deleteBook = async (
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean } | ApiError>
) => {
  if (req.method === "DELETE") {
    const { id } = req.query;
    const { db } = await connectToDatabase();
    try {
      const result = await db
        .collection("books")
        .findOneAndDelete({ _id: new ObjectId(id as string) });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(501).json({ error: "Internal server error" });
    }
  } else {
    res.status(404).json({ error: "Not Found" });
  }
};
export default deleteBook;
