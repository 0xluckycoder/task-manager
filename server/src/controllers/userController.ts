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

const signIn = async (req: Request, res: Response, next: NextFunction) => {
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
            // secure: true
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

/**
 * @desc Re-authenticate if cookies exists & Refresh expired tokens
 * @path GET /api/v1/verifyAuth
 * @authorization Public
 * */
const verifyAuth = async (req: Request, res: Response, next: NextFunction) => {

    const { AccessToken, RefreshToken, IdToken } = req.cookies;

    try {
        // validate cookies
        if (!AccessToken || !RefreshToken || !IdToken) {
            const tokenUnavailableError = new Error('no cookies available');
            tokenUnavailableError.name = 'CookiesUnavailable';            
            throw tokenUnavailableError;
        }

        // get user data from cognito
        const userData = await userService.verifyAuth(req.cookies);
        console.log('from here');
        return res.status(200).json({
            data: userData
        });

    } catch(error) {

        /**
         * if AccessToken is expired re-assign new access & id tokens to client
         * if AccessToken is invalid throw error
         * */

        if (error instanceof Error) {
            console.log(error.message, '🚀🚀');
            if (error.message === 'Access Token has expired') {
                console.log('Refreshing the Access/ID tokens 🌟');
    
                // user controller code and below code looks identical try to make it reusable
                try {
                    const refreshedTokens = await userService.refreshTokens(RefreshToken);
                    const cookiesConfig: CookieOptions = {
                        maxAge: (60000 * 60 * 24) * 30,
                        httpOnly: true,
                        sameSite: 'none',
                        // secure: true
                    }
    
                    // Clear existing token cookies
                    res.clearCookie('AccessToken', cookiesConfig);
                    res.clearCookie('IdToken', cookiesConfig);
    
                    // Reassign new access & id token cookies
                    res.cookie('AccessToken', refreshedTokens.AuthenticationResult?.AccessToken, cookiesConfig);
                    res.cookie('IdToken', refreshedTokens.AuthenticationResult?.IdToken, cookiesConfig);

                    // Get user data from cognito using refreshed access token
                    const verifyAuthResponse = await userService.verifyAuth({
                        AccessToken: refreshedTokens.AuthenticationResult?.AccessToken
                    });

                    return res.json({
                        data: verifyAuthResponse
                    });

                } catch (error) {
                    console.log(error);
                    next(error);
                }
            }   
        }

        console.log('❌❌', error);
        next(error);
    }
}

const getUserBySubId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user === undefined) return;
        
        const { subId } = req.user;
        const response = await userService.getUserBySubId(subId);

        res.status(200).json({
            data: response
        });
    } catch (error) {
        console.log(error);
    }
}

export = {
    signUp,
    signIn,
    verifyAuth,
    getUserBySubId
}