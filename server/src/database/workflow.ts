import WorkflowEntry from "../models/WorkflowEntry";
import { Workflow } from "../types/custom";

const getWorkflowsByCurrentAuthUser = async (userId: string) => {
    try {
        const getWorkflowsByCurrentAuthUser = WorkflowEntry.find({
            userId
        });
        return getWorkflowsByCurrentAuthUser;
    } catch (error) {
        throw error;
    }  
}

const createWorkflow = async (workflow: Workflow) => {
    try {
        const workflowEntry = new WorkflowEntry(workflow);
        const createdWorkflowEntry = workflowEntry.save();
        return createdWorkflowEntry;
    } catch(error) {
        throw error;
    }
}

export = {
    getWorkflowsByCurrentAuthUser,
    createWorkflow
}