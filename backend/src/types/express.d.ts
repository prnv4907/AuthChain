// src/types/express.d.ts

declare namespace Express {
  export interface Request {
    userId?: number; // Or 'string' if your ID is not a number
  }
}
