import type { NextApiRequest, NextApiResponse } from "next";

const unauthorized = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(401).json({ message: "Not authenticated." });
};
export default unauthorized;
