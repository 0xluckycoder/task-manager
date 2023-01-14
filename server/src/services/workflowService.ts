import workflow from '../database/workflow';
import { Workflow, WorkflowService } from '../types/custom';
// import { UpdatableAttributes } from '../types/custom';

const getWorkflowsByCurrentAuthUser = async (userId: string) => {
    try {
        // const workflowsByCurrentAuthUser = workflow.
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

export = {
    getWorkflowsByCurrentAuthUser,
    createWorkflow
    // getSingleWorkflow,
    // updateWorkflow,
    // deleteWorkflow
}