import { Router, Response, Request } from 'express';

import { Task, User } from '../models';

const router = Router();

// list tasks
router.get('/', async (req: Request, res: Response) => {
    const tasks = await Task.find({ user: req.user.id }).sort('priority');

    res.json(tasks);
});

// create task
router.post('/', async (req: Request, res: Response) => {
    const task = await Task.create({ ...req.body, user: req.user.id });
    await User.findOneAndUpdate({ _id: req.user.id }, { $push: { tasks: task.id } });

    res.json(task);
});

// get task
router.get('/:taskId', async (req: Request, res: Response) => {
    const task = await Task.findById(req.params.taskId).populate('user');

    res.json(task);
});

// update task
router.patch('/:taskId', async (req: Request, res: Response) => {
    const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });

    res.json(task);
});

// replace tasks
router.put('/', async (req: Request, res: Response) => {
    for (let task of req.body.tasks) {
        await Task.replaceOne({ _id: task._id }, task);
    }

    const tasks = await Task.find({ user: req.user.id }).sort('priority');

    res.json(tasks);
});

// delete task(s)
router.delete('/', async (req: Request, res: Response) => {
    const taskIds = req.body.tasks;
    const tasks = await Task.deleteMany({ _id: { $in: taskIds } });
    await User.findOneAndUpdate({ _id: req.user.id }, { $pull: { tasks: { $in: taskIds } } });

    res.json(tasks);
});

export const taskRoutes = router;
