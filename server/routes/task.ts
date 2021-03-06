import { Router, Response, Request, NextFunction } from 'express';

import { Task, User } from '../models';

const router = Router();

// list tasks
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort('priority');
        res.json(tasks);
    } catch (err) {
        next(err);
    }
});

// create task
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = await Task.create({ ...req.body, user: req.user.id });
        await User.findOneAndUpdate({ _id: req.user.id }, { $push: { tasks: task.id } });
        res.json(task);
    } catch (err) {
        next(err);
    }
});

// get task
router.get('/:taskId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = await Task.findById(req.params.taskId).populate('user');
        res.json(task);
    } catch (err) {
        next(err);
    }
});

// update task
router.patch('/:taskId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
        res.json(task);
    } catch (err) {
        next(err);
    }
});

// replace tasks
router.put('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        for (let task of req.body) {
            await Task.replaceOne({ _id: task._id }, task);
        }

        const tasks = await Task.find({ user: req.user.id }).sort('priority');
        res.json(tasks);
    } catch (err) {
        next(err);
    }
});

// delete task(s)
router.delete('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskIds = req.body;
        await Task.deleteMany({ _id: { $in: taskIds } });
        await User.findOneAndUpdate({ _id: req.user.id }, { $pull: { tasks: { $in: taskIds } } });

        res.json({message: 'Task(s) deleted successfully.'});
    } catch (err) {
        next(err);
    }
});

export const taskRoutes = router;
