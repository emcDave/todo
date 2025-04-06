import express from "express";
import task from "./task";
const router = express.Router();
export default (): express.Router => {
  task(router);
  return router;
};
