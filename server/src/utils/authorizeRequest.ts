import { CookieOptions, NextFunction, Request, Response } from "express";
import userService from "../services/userService";

export const authorizeRequest = async (req: Request, res: Response, next: NextFunction) => {
    const { AccessToken, RefreshToken, IdToken } = req.cookies;    

    try {
        // validate cookies
        if (!AccessToken || !RefreshToken || !IdToken) {
            const tokenUnavailableError = new Error('no cookies available');
            tokenUnavailableError.name = 'CookiesUnavailable';
            throw tokenUnavailableError;
        }

        const verifyAuthResponse = await userService.verifyAuth(req.cookies);

        // get user
        // const userData = await user.getUserBySubId(verifyAuthResponse!.subId);

        // assign user data to req object
        req.user = {
            _id: verifyAuthResponse!._id as string,
            email: verifyAuthResponse!.email,
            subId: verifyAuthResponse!.subId
        };
        
        next();
    } catch (error) {

        /**
         * if AccessToken is expired re-assign new access & id tokens to client
         * if AccessToken is invalid throw error
         * */

        if (error instanceof Error) {
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
                    res.cookie('IdToken', refreshedTokens.AuthenticationResult?.IdToken);

                    // Get user data from cognito using refreshed access token
                    const verifyAuthResponse = await userService.verifyAuth({
                        AccessToken: refreshedTokens.AuthenticationResult?.AccessToken
                    });
    
                    // get user
                    // const userData = await user.getUserBySubId(verifyAuthResponse!.subId);
    
                    // Assign user data to req object
                    req.user = {
                        _id: verifyAuthResponse!._id as string,
                        email: verifyAuthResponse!.email,
                        subId: verifyAuthResponse!.subId
                    };
    
                    return next();
                } catch (error) {
                    console.log('❌❌' ,error);
                    next(error);
                }
            }   
        }

        console.log('❌❌' ,error);
        next(error);

    }
}