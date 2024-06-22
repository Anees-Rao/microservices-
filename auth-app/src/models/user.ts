import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    createdTime: Date;
}

const userSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    createdTime: { type: Date, default: Date.now },
});

export default mongoose.model<UserDocument>('User', userSchema);
