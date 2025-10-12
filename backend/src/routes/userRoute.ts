import jwt from "jsonwebtoken";
import express, { Router } from "express";
import {
  EventCheck,
  LoginCheck,
  ProdutCheck,
  SighnupCheck,
} from "../middlewar/TypesMiddleware";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { TokenCheck } from "../middlewar/TokenMiddleware";
const userRouter: Router = express();
const prisma = new PrismaClient();
const jsonPassword = process.env.JSONSECRET;

userRouter.post("/sighnUp", SighnupCheck, async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;
  console.log(req.body.username);
  const isSuccess = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (isSuccess) {
    res.status(409).json({
      message: "email already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const success = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    },
  });
  res.status(200).json(success);
});
userRouter.get("/login", LoginCheck, async (req, res) => {
  const { username, password } = req.body;
  const userId = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  if (!userId) {
    res.status(401).json({
      message: "incorrect credentials",
    });
  }
  try {
    const success = await bcrypt.compare(password, userId.password);
    if (!success) {
      res.status(401).json({
        message: "incorrect credentials",
      });
    }
    const token = await jwt.sign(userId.id, jsonPassword);
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3600000,
    });
    res.status(200).json({
      message: "Logged in successfully",
      token,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
userRouter.post(
  "/registerProduct",
  ProdutCheck,
  TokenCheck,
  async (req, res) => {
    const userId = parseInt(req.userId);
    console.log(userId);
    if (!userId) {
      res.status(401).json({
        message: "userId not assigner",
      });
    }
    const modelNo = req.body.modelNo;
    const IsFound = await prisma.product.findUnique({
      where: {
        modelNo: modelNo,
      },
    });
    if (IsFound != null) {
      res.status(409).json({
        message: "product already registered",
      });
    }

    //Inidializing the pda account for the product and gettting the pda account pubkey
    const pdaAccount = "MinalChaudhary";
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        modelNo: req.body.modelNo,
        pdaAccount: pdaAccount,
        owner: {
          connect: {
            id: userId,
          },
        },
      },
    });
    res.status(200).json(product);
  },
);

userRouter.post("/event", EventCheck, async (req, res) => {
  const toAccount: string = req.body.toAccount;
  const fromAccount: string = req.body.fromAccount;
  const productAccount: string = req.body.productAccount;
  const product = await prisma.product.findUnique({
    where: {
      pdaAccount: productAccount,
    },
  });
  if (product == null) {
    res.status(500).json({
      message: "indexing error",
    });
    const productId = parseInt(product.id);
    const Event = await prisma.event.create({
      data: {
        fromAccount: fromAccount,
        date: new Date(),
        toAccount: toAccount,
        productId: productId,
      },
    });
  }
  userRouter.post("/transfer", async (req, res) => {
    const { fromAccount, toAccount, productId } = req.body;
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (product == null) {
      res.status(400).json({
        message: "invalid product id",
      });
      ///make the call to the solana smart contract for transferring the account
      res.status(200).json({
        message: "tranfer id",
      });
    }
  });

  res.status(200).json({ Event });
});

export default userRouter;
