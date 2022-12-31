import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';
import userService from '../services/userService';
import { CookieOptions } from 'express';

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

const signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

        const validated = await userSchema.validate(req.body);

        // sign in the user
        const data = await userService.signIn(validated);

        // set access token, refresh token, id token on client accordingly
        const cookiesConfig: CookieOptions = {
            maxAge: (60000 * 60 * 24) * 30,
            httpOnly: true,
            sameSite: 'none',
            secure: true
        }

        // clear existing token cookies
        res.clearCookie('AccessToken', cookiesConfig);
        res.clearCookie('IdToken', cookiesConfig);
        res.clearCookie('RefreshToken', cookiesConfig);

        res.cookie('AccessToken', data?.tokens.accessToken, cookiesConfig);
        res.cookie('RefreshToken', data?.tokens.refreshToken, cookiesConfig);
        res.cookie('IdToken', data?.tokens.idToken, cookiesConfig);

        console.log(data?.tokens, '🔥');

        // signIn response
        res.status(200).json({
            success: true,
            data: data
        });
        
    } catch (error) {
        console.log(error);
    }
}

export = {
    signUp,
    signIn
}