import { nextTick } from 'process';
import workflow from '../database/workflow';
import { UpdatableWorkflow, Workflow, WorkflowService } from '../types/custom';
// import { UpdatableAttributes } from '../types/custom';
import { customError } from '../utils/customError';

const getWorkflowsByCurrentAuthUser = async (userId: string) => {
    try {
        const response = workflow.getWorkflowsByCurrentAuthUser(userId);
        return response;
    } catch (error) {
        throw error;
    }  
}

const createWorkflow = async (workflowData: WorkflowService) => {
    try {
        // construct empty workflow to be created
        const response = await workflow.createWorkflow({
            ...workflowData,
            tasks: []
        });
        
        return response;
    } catch (error) {
        throw error;
    }
}

const updateWorkflow = async (userId: string, id: string, updatableWorkflowData: UpdatableWorkflow) => {
    try {
        // throw error if workflow record does not belong to the current user
        const requestedWorkflow = await workflow.getWorkflowById(id);
        if (requestedWorkflow?.userId !== userId) throw customError('Unauthorized request', 'Unauthorized');

        const response = await workflow.updateWorkflow(id, updatableWorkflowData);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteWorkflow = async (userId: string, id: string) => {
    try {
        // throw error if workflow record does not belong to the current user
        const requestedWorkflow = await workflow.getWorkflowById(id);
        if (requestedWorkflow?.userId !== userId) throw customError('Unauthorized request', 'Unauthorized');

        const response = await workflow.deleteWorkflow(id);
        return response;
    } catch (error) {
        throw error;
    }
}

export = {
    getWorkflowsByCurrentAuthUser,
    createWorkflow,
    updateWorkflow,
    deleteWorkflow
    // getSingleWorkflow,
}