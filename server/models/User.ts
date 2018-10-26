import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required.']
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    },
    profile: {
        firstName: String,
        lastName: String,
    }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
