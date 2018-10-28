import * as jwt from 'jsonwebtoken';
import { Router, Response, Request } from 'express';

import { User } from '../models';
import { isAuthenticated } from '../config/passport';

const router = Router();

// dummy for checking the auth
router.get('/user', isAuthenticated(), (req: Request, res: Response) => {
    res.json({ data: req.user });
});

router.post('/signup', async (req: Request, res: Response) => {
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
});

router.post('/login', async (req: Request, res: Response) => {
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
            delete user.password;
            res.json({ token: token, user});
            return;
        }

        res.status(401).json({ message: 'Incorrect password. Please try again.' });
    } else {
        res.status(400).json({ message: 'Incomplete form submitted.' });
    }
});

export const authRoutes = router;
