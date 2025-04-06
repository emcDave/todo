import * as dotenv from "dotenv";
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  completed: { type: Boolean, default: false },
});
export const taskModel = mongoose.model(`Task`, taskSchema);
export const creatNewTask = (values: Record<string, any>) =>
  new taskModel(values).save().then((task) => task.toObject());
export const getAllTask = () => taskModel.find().lean();
export const getTaskById = (id: string) =>
  taskModel.findOne({ _id: id }).lean();
export const deleteTaskById = (id: string) => taskModel.findByIdAndDelete(id);
export const updateTaskById = (id: string, values: Record<string, any>) =>
  taskModel.findByIdAndUpdate(id, values, {
    returnDocument: "after",
  });
