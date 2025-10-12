import type { NextFunction, Request, Response } from "express";
import {
  EventSchema,
  LoginSchema,
  ProductSchema,
  SighnUPSchema,
} from "../types/types";

export const SighnupCheck = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const IsParsed = SighnUPSchema.safeParse(req.body);
  if (!IsParsed) {
    res.status(400).json(IsParsed);
  }
  next();
};
export const LoginCheck = (req: Request, res: Response, next: NextFunction) => {
  const IsParsed = LoginSchema.safeParse(req.body);
  if (!IsParsed) {
    res.status(400).json(IsParsed);
  }
  next();
};
export const ProdutCheck = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const IsParsed = ProductSchema.safeParse(req.body);
  if (!IsParsed) {
    res.status(400).json(IsParsed);
  }
  next();
};
export const EventCheck = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const IsParsed = EventSchema.safeParse(req.body);
  if (!IsParsed) {
    res.status(400).json(IsParsed);
  }
  next();
};
