import express from "express";
import auth from "../middleware/auth/auth.js";
import {
  createtask,
  getall_task,
  deletetask,
  updatetask,
  mycreatedtask,
  mytasks,
} from "../controller/task/taskcontroller.js";

const router = express.Router();

router.post("/createtask", auth, createtask);
router.get("/alltask", auth, getall_task);
router.delete("/:id", auth, deletetask);
router.put("/:id", auth, updatetask);
router.get("/mycreated", auth, mycreatedtask);
router.get("/mytask", auth, mytasks);

export default router;
