import mongoose, { Schema } from "mongoose";

type User = {
    email: string,
    password: string
}

const userEntrySchema = new Schema<User>({
    email: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

const UserEntry = mongoose.model('UserEntry', userEntrySchema);

export = UserEntry;