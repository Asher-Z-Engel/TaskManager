const Task = require('../models/Task')
const wrapAsync = require('../async/wrapAsync')

const getAllTasks = wrapAsync(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({tasks})
})

const createTask = wrapAsync(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

const getTask = wrapAsync(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({_id: taskID})
    if (!task) {
      return res.status(404).json({ msg: `Cannot find task with id: ${taskID}` })
    }
    res.status(200).json({task})
})

const updateTask = wrapAsync(async (req, res) => {
    const { id: taskID } = req.params
    const data = req.body
    const task = await Task.findOneAndUpdate({ _id: taskID }, data, {
      new: true,
      runValidators: true
    })
    if (!task) {
      return res.status(404).json({ msg: `Cannot find task with id: ${taskID}` })
    }
    res.status(200).json({task})  
})

const deleteTask = wrapAsync(async (req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID })
    if (!task) {
      return res.status(404).json({ msg: `Cannot find task with id: ${taskID}` })
    }
    res.status(200).json({task})
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
}