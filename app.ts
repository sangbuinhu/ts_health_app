import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import { router } from "./src/routers";
import formData from "express-form-data";
import os from "os";

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
};

const app = express();

app.use(formData.parse(options));
app.use(formData.format());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", router);

const port = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || "";

const server = http.createServer(app);

mongoose.connect(MONGODB_URL).then(() => {
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}).catch((error) => {
  console.log({ error });
  process.exit(1);
});