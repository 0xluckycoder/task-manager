import WorkflowEntry from "../models/WorkflowEntry";
import { Workflow } from "../types/custom";

const getWorkflowsByCurrentAuthUser = async (userId: any) => {
    try {
        console.log(userId);
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