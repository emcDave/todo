import express from "express";
import {
  creatNewTask,
  deleteTaskById,
  getAllTask,
  getTaskById,
  updateTaskById,
} from "../db/task";
import task from "router/task";

interface Task {
  title: String;
  completed?: Boolean;
}
export const postTask_ = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { title } = req.body;
    console.log("Received title:", title); // Debugging log

    if (!title) {
      return res.status(400).json({ error: "Task title is required" });
    }
    const newTask = await creatNewTask({ title });
    res.status(201).json(newTask);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
export const getAllTasks_ = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const allTasks = await getAllTask();
    res.status(200).json(allTasks);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
export const getTaskById_ = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Task ID is required" });
  }
  try {
    const task = await getTaskById(id);
    res.status(200).json(task);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
export const delTaskById_ = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Task ID is required" });
  }
  try {
    const task = await deleteTaskById(id);
    res.status(200).json({ task, message: "Task deleted successfully" });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
export const updatedTaskById_ = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Task ID is required" });
  }
  try {
    const ifTask = await getTaskById(id);
    if (!ifTask) {
      return res.status(404).json({ error: "Task ID is not found" });
    }
    const task = await updateTaskById(id, { title, completed });
    res.status(200).json({ task, message: "Task updated successfully" });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
