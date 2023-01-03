import { Router } from "express";
import userController from '../../controllers/userController';
import { authorizeRequest } from "../../utils/authorizeRequest";

const router = Router();

router.post('/signup', userController.signUp);

router.post('/login', userController.signIn);

router.get('/verifyAuth', userController.verifyAuth);

router.get('/', authorizeRequest, userController.getUserBySubId);

router.put('/', authorizeRequest, userController.updateUserAttributes);

export = router;