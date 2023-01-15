export type User = {
    _id: string,
    email: string,
    subId: string
}

export type UpdatableAttributes = {
    email: string
}

export interface Workflow {
    _id?: string;
    name: string;
    tasks: string[] | [];
    userId: string;
}

export interface WorkflowService {
    name: string,
    userId: string
}

export interface UpdatableWorkflow {
    name?: string;
    tasks?: string[];
}