

import express from 'express'
                             
import { loginValidation, signupValidation } from '../middlewares/AuthValidation.js'

const router = express.Router();

import { Signup ,Login ,Logout } from '../controllers/AuthControllers.js'


router.post('/signup', signupValidation ,Signup);

router.post('/login', loginValidation ,Login);

router.post('/logout',Logout);



export default router;