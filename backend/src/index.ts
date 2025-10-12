import express from "express";
import userRouter from "./routes/userRoute";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/", userRouter);
const port = process.env.port;
app.listen(port, () => {
  console.log("server running at port", port);
});
