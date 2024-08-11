import mongoose from "mongoose";
import taskSchema from "../../model/taskmodel/taskmodel.js";

const createtask = async (req, res) => {
  try {
    const data = new taskSchema({
      ...req.body,
      created_by: req.user._id,
    });

    await data.save();
    res.send({ message: "task created sucessfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getall_task = async (req, res) => {
  try {
    const data = await taskSchema
      .find()
      .populate({ path: "created_by", select: "-password" })
      .populate({ path: "asignto", select: "-password" });

    res.send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletetask = async (req, res) => {
  try {
    const task_id = req.params.id;

    const isvalid = mongoose.isValidObjectId(task_id);

    if (!isvalid) {
      return res.status(400).send({ error: "task not valid_id" });
    }

    const task = await taskSchema.findById(task_id);
    if (!task) {
      return res.status(400).send({ error: "connot find task" });
    }

    if (task.created_by.toString() !== req.user.id) {
      return res
        .status(400)
        .send({ error: "you connot access to delete task" });
    }

    await task.deleteOne();

    res.json({ message: "task deleted success full" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatetask = async (req, res) => {
  try {
    const { task, details, asignto } = req.body;
    const task_id = req.params.id;
    const isvalid = mongoose.isValidObjectId(task_id);

    if (!isvalid) {
      return res.status(400).send({ error: "task not valid_id" });
    }

    const tasks = await taskSchema.findById(task_id);
    if (!tasks) {
      return res.status(400).send({ error: "connot find task" });
    }

    if (tasks.created_by.toString() !== req.user.id) {
      return res
        .status(400)
        .send({ error: "you connot access to delete or modify task" });
    }

    tasks.task = task || tasks.task;
    tasks.details = details || tasks.details;
    tasks.asignto = asignto || tasks.asignto;

    await tasks.save();

    res.send({ message: "task updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const mycreatedtask = async (req, res) => {
  const q = req.query.q;

  try {
    const tasks = await taskSchema.find({
      $and: [{ created_by: req.user.id }, q ? { status: q } : {}],
    });
    res.send(tasks);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
const mytasks = async (req, res) => {
  const q = req.query.q;

  try {
    const tasks = await taskSchema.find({
      $and: [{ asignto: req.user.id }, q ? { status: q } : {}],
    });
    res.send(tasks);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
export {
  createtask,
  getall_task,
  deletetask,
  updatetask,
  mycreatedtask,
  mytasks,
};
