import WorkflowEntry from "../models/WorkflowEntry";
import { UpdatableWorkflow, Workflow } from "../types/custom";

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

const getWorkflowById = async (id: string) => {
    try {
        const workflowEntry = await WorkflowEntry.findById(id);
        return workflowEntry;
    } catch (error) {
        throw error;
    }
}

const updateWorkflow = async (id: string, updatableWorkflow: UpdatableWorkflow) => {
    try {
        const workflowEntry = await WorkflowEntry.updateOne({
            _id: id
        }, {
            ...updatableWorkflow
        });
        return workflowEntry;
    } catch (error) {
        throw error;
    }
}

export = {
    getWorkflowsByCurrentAuthUser,
    createWorkflow,
    updateWorkflow,
    getWorkflowById
}