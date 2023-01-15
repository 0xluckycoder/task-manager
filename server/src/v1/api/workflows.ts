import { Router } from "express";
import workflowController from "../../controllers/workflowController";
import { authorizeRequest } from "../../utils/authorizeRequest";

const router = Router();

router.post('/', authorizeRequest, workflowController.createWorkflow);

router.get('/', authorizeRequest, workflowController.getWorkflowsByCurrentAuthUser);

router.put('/:id', authorizeRequest, workflowController.updateWorkflow);

router.delete('/:id', authorizeRequest, workflowController.deleteWorkflow);

router.get('/:id', authorizeRequest, workflowController.getWorkflowById);

export = router;