import express from "express";
import {
  postTask_,
  getTaskById_,
  getAllTasks_,
  delTaskById_,
  updatedTaskById_,
} from "../controller/task";
export default (router: express.Router) => {
  router.post("/api/tasks", postTask_);
  router.get("/api/tasks", getAllTasks_);
  router.get("/api/tasks/:id", getTaskById_);
  router.delete("/api/tasks/:id", delTaskById_);
  router.put("/api/tasks/:id", updatedTaskById_);
};
