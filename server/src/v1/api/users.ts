import { Router } from "express";
import userController from '../../controllers/userController';

const router = Router();

router.post('/signup', userController.signUp);

router.post('/login', userController.signIn);

router.get('/verifyAuth', userController.verifyAuth);

// router.get('/:id', userController.getUserBySubId);

export = router;