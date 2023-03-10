import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';
import workflowService from '../services/workflowService';

/**
 * @desc Gets all workflows by current authenticated user
 * @path GET /api/v1/workflows/:id
 * @authorization Private
 * */
const getWorkflowsByCurrentAuthUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.user!;
        const response = await workflowService.getWorkflowsByCurrentAuthUser(_id);

        res.status(200).json({
            data: response
        });
    } catch (error) {
        next(error);
    }  
}

/**
 * @desc Create new workflow item
 * @path POST /api/v1/workflows
 * @authorization Private
 * */ 
const createWorkflow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.user!;

        // validate user inputs
        const workflowSchema = yup.object().shape({
            name: yup.string()
                        .required('name is string')
                        .max(127, 'name is too long')
        });

        const validated = await workflowSchema.validate(req.body); 
        const response = await workflowService.createWorkflow({
            ...validated,
            userId: _id
        });

        res.status(200).json({
            data: response
        });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc Update workflow
 * @path PUT /api/v1/workflows/:id
 * @authorization Private
 * */ 
const updateWorkflow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { _id: userId } = req.user!;

        // validate user inputs
        const workflowSchema = yup.object().shape({
            name: yup.string()
                        .max(127, 'name is too long'),
            tasks: yup.array()
        });

        const validated = await workflowSchema.validate(req.body);
        const response = await workflowService.updateWorkflow(userId, id, validated);
        
        res.status(200).json({
            data: response
        });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc Delete workflow
 * @path DELETE /api/v1/workflows/:id
 * @authorization Private
 * */
const deleteWorkflow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { _id: userId } = req.user!;

        const response = await workflowService.deleteWorkflow(userId, id);
        
        res.status(200).json({
            data: response
        });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc Get Workflow by ID
 * @path GET /api/v1/workflows/:id
 * @authorization Private
 * */
const getWorkflowById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { _id: userId } = req.user!;

        const response = await workflowService.getWorkflowById(userId, id);

        res.status(200).json({
            data: response
        });
    } catch (error) {
        next(error);
    }
}


export = {
    createWorkflow,
    getWorkflowsByCurrentAuthUser,
    updateWorkflow,
    deleteWorkflow,
    getWorkflowById
}