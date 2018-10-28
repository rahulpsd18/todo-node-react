import * as jwt from 'jsonwebtoken';
import { Router, Response, Request, NextFunction } from 'express';

import { User } from '../models';

const router = Router();

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });

        if (user) {
            res.status(400).json({ message: `Email already exists.` });
            return;
        }

        if (email && password) {
            try {
                await User.create(req.body);
                res.json({ message: 'User created successfully.' });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        } else {
            res.status(400).json({ message: 'Incomplete form submitted.' });
        }
    } catch (err) {
        next(err);
    }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { email, password } = req.body;

        if (email && password) {
            const user = await User.findOne({ email: email.toLowerCase() }).select('+password').exec();
            if (!user) {
                res.status(401).json({ message: `No account exists with email ${email}.` });
                return;
            }

            const passwordMatch = await user.comparePassword(password);
            if (passwordMatch) {
                const payload = { id: user.id };
                const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1d' });

                const userObj = user.toObject();
                delete userObj.password;

                res.json({ token: token, user: userObj });
                return;
            }

            res.status(401).json({ message: 'Incorrect password. Please try again.' });
        } else {
            res.status(400).json({ message: 'Incomplete form submitted.' });
        }
    } catch (err) {
        next(err);
    }
});

export const authRoutes = router;
