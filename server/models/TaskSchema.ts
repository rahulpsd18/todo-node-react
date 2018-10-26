import * as mongoose from 'mongoose';
import { ObjectId } from 'bson';
import { IUser } from './UserSchema';

interface ITaskAttributes {
    isActive: boolean;
    title: string;
    description?: string;
    dueDate?: Date;
    user: ObjectId;
    priority: Priority;
}

export enum Priority {
    HIGH = 'HIGH',
    MEDIUM = 'MEDIUM',
    LOW = 'LOW',
}

// Ref: static and member model methods https://stackoverflow.com/a/45675548/1297190
export interface ITask extends ITaskAttributes, mongoose.Document {
    id: ObjectId;
    user: ObjectId & IUser;
}

export interface ITaskStatics extends mongoose.Model<ITask> {
}

export const taskSchema = new mongoose.Schema({
    isActive: {
        type: Boolean,
        default: true
    },
    title: {
        type: String,
        required: [true, 'Title is required.'],
    },
    description: String,
    dueDate: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId, // Id of User
        ref: 'User'
    },
    priority: {
        type: String,
        enum: Object.keys(Priority),
        default: Priority.MEDIUM
    },
}, { timestamps: true });
