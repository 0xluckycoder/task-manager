import mongoose, { Schema } from "mongoose";

type User = {
    email: string,
    subId: string
}

const userEntrySchema = new Schema<User>({
    email: { type: String, required: true },
    subId: { type: String, required: true }
}, { timestamps: true });

const UserEntry = mongoose.model('UserEntry', userEntrySchema);

export = UserEntry;