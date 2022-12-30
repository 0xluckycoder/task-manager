import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';
import userService from '../services/userService';

const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {        

        // validate schema
        const userSchema = yup.object().shape({
            email: yup.string()
                    .required()
                    .max(127, 'email address is too long')
                    .email('not a valid email address'),
            password: yup.string()
                        .required('password is required')
                        .max(127, 'password is too long')                    
        });

        // type User = yup.InferType<typeof userSchema>;
        const validated = await userSchema.validate(req.body);

        const createdUser = await userService.createUser(validated);
        
        res.status(200).json({
            data: createdUser 
        });
    } catch (error) {
        console.log(error);
    }
}

// const signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         // validate schema
//         const userSchema = yup.object().shape({
//             email: yup.string()
//                     .required()
//                     .max(127, 'email address is too long')
//                     .email('not a valid email address'),
//             password: yup.string()
//                         .required('password is required')
//                         .max(127, 'password is too long')                    
//         });

//         const validated = await userSchema.validate(req.body);

//         // sign in the user
//         await userService.signIn(validated);

//     } catch (error) {
//         console.log(error);
//     }
// }

export = {
    signUp
}