import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
interface AuthenticatedRequest extends Request {
  user?: { userId: number };
}
export const TokenCheck = (req: Request, res: Response, next: NextFunction) => {
  const tokenPassword = process.env.JSONSECRET;
  const token = req.cookies.authToken;
  if (token == null) {
    return res.status(401).json({
      message: "Unauthorized: No token provided",
    });
  }
  try {
    const decodedPayload = jwt.verify(token, tokenPassword);
    req.userId = decodedPayload;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized: Invalid token",
    });
  }
};
