import { Request, Response, NextFunction } from "express";

export const errorHandlingMiddleware = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ error: error.message });
  }
  res.status(500).json({ error: "Internal Server Error" });
};

export class CustomError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
