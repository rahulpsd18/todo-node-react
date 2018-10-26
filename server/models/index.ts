import * as mongoose from 'mongoose';
import { IUser, IUserStatics, userSchema } from './UserSchema';
import { ITask, ITaskStatics, taskSchema } from './TaskSchema';

export const User = mongoose.model<IUser, IUserStatics>('User', userSchema);
export const Task = mongoose.model<ITask, ITaskStatics>('Task', taskSchema);
