import { z } from "zod";
export const SighnUPSchema = z.object({
  username: z.string().min(3).max(10),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  password: z.string().min(6),
});
export const LoginSchema = z.object({
  username: z.string().min(3).max(10),
  password: z.string().min(6),
});
export const ProductSchema = z.object({
  name: z.string(),
  modelNo: z.string(),
});
export const EventSchema = z.object({
  fromAccount: z.string(),
  toAccount: z.string(),
  productAccount: z.string(),
});
