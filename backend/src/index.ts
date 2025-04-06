import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import * as dotenv from "dotenv";
import router from "./router";
import path from "path";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);
const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
const MONGO_URL = process.env.MONGODB_URL;
console.log(MONGO_URL);

if (!MONGO_URL) throw Error("missing mongo connection string");
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => {
  console.log(error);
});
mongoose.connection.on("connected", async () => {
  console.log("Mongo Database connected");
  app.use("/", router());
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
mongoose.connection.on("disconnected", () => {
  console.log("Mongo Database disconnected");
});
