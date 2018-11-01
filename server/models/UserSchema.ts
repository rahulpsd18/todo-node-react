import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import { ObjectId } from 'bson';
import { ITask } from './TaskSchema';

interface IUserAttributes {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    tasks: ObjectId[];
}

// This is the interface for an User instance
export interface IUser extends IUserAttributes, mongoose.Document {
    id: ObjectId;
    tasks: ObjectId[] & ITask[];

    // instance methods go here. Only the signature
    comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserStatics extends mongoose.Model<IUser> {
    // static methods go here. Only the signature
}

export const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required.']
    },
    password: {
        type: String,
        select: false,
        required: [true, 'Password is required.'],
    },
    firstName: String,
    lastName: String,
    tasks: {
        type: [mongoose.Schema.Types.ObjectId], // Ids of Tasks
        default: [],
        ref: 'Task'
    },
}, { timestamps: true });

userSchema.pre('save', async function (this: IUser, next: mongoose.HookNextFunction) {
    if (!this.isModified('password')) { return next(); }
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};
