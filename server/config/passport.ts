import * as passport from 'passport';
import { ExtractJwt, Strategy, VerifiedCallback, StrategyOptions } from 'passport-jwt';
import { User } from '../models/User';

const params: StrategyOptions = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

// tslint:disable-next-line:no-any
const strategy = new Strategy(params, async (payload: any, done: VerifiedCallback) => {
    const user = await User.findById(payload.id);

    return user
        ? done(null, { user })
        : done(Error('No such user exists.'));
});

passport.use(strategy);

export const isAuthenticated = () => passport.authenticate('jwt', {session: false});
