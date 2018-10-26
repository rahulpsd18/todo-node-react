import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import { ObjectId } from 'bson';

interface IUserAttributes {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

// Ref: static and member model methods https://stackoverflow.com/a/45675548/1297190
export interface IUser extends IUserAttributes, mongoose.Document {
    id: ObjectId;

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
