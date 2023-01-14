import mongoose, { Schema } from "mongoose";
import { Workflow } from "../types/custom";

const workflowEntrySchema = new Schema<Workflow>({
    name: { type: String, required: true },
    tasks: { type: [String] },
    userId: { type: String, required: true }
}, { timestamps: true });

const WorkflowEntry = mongoose.model('WorkflowEntry', workflowEntrySchema);

export = WorkflowEntry;