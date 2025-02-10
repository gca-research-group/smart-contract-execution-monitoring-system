import { Request, Response } from "express";

export const index = async (_req: Request, res: Response) => {
  res.json({ message: 'The service is on.' });
};
