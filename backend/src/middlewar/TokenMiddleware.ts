import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
require("dotenv").config();
interface AuthenticatedRequest extends Request {
  user?: { userId: number };
}
const prisma = new PrismaClient();
export const TokenCheck = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!process.env.JWT_SECRET) {
    throw new Error(`Fatal Error: jwt_secret is not defined`);
  }
  const token = req.cookies.authToken;
  if (token == null) {
    return res.status(401).json({
      message: "Unauthorized: No token provided",
    });
  }
  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: number;
    };
    req.userId = decodedPayload.userId;
    const user = await prisma.user.findUnique({
      where: {
        id: decodedPayload.userId,
      },
    });
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized: Invalid token",
    });
  }
};
