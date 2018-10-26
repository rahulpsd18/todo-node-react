import * as mongoose from 'mongoose';
import { IUser, IUserStatics, userSchema } from './UserSchema';

export const User = mongoose.model<IUser, IUserStatics>('User', userSchema);
