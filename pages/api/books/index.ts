import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../libs/db";

const getBooks = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method==='GET'){

  const { db } = await connectToDatabase();
  try {
    const books = await db.collection("books").find().toArray();

    res.status(200).json({ books });
  } catch (error) {
    res.status(501).json({ error: "Internal server error" });
  }

  }else{

    res.status(404).json({ error: "Not found" });
  }
};
export default getBooks
