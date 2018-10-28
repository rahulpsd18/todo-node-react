import { Router, Response, Request, NextFunction } from 'express';

import { User } from '../models';

const router = Router();

// FIXME: only sending one removes the other; also needs validations
router.patch('/profile', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName } = req.body;
        const user = await User.findById(req.user.id);

        user!.set({ firstName, lastName });
        user!.save();
        res.json({ user });
    } catch (err) {
        next(err);
    }
});

router.patch('/password', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { oldPassword, password } = req.body;
        const user = await User.findById(req.user.id).select('+password').exec();
        const isMatch = await user!.comparePassword(oldPassword);

        if (!isMatch) {
            res.status(401).json({ message: `Incorrect Password.` });
            return;
        }

        user!.set({ password });
        user!.save();
        res.json({ message: 'Password changed successfully.' });
    } catch (err) {
        next(err);
    }
});

export const accountRoutes = router;
