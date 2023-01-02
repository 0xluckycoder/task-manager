import user from '../database/user';
import { 
    CognitoIdentityProvider, 
    SignUpCommand, 
    AdminConfirmSignUpCommand, 
    AdminInitiateAuthCommand, 
    GetUserCommand,
    InitiateAuthCommand
} from '@aws-sdk/client-cognito-identity-provider';
import { CookieSerializeOptions } from 'cookie';

type User = {
    email: string,
    password: string
}

const createUser = async (data: User) => {
    try {
        const client = new CognitoIdentityProvider({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
            }
        });

        // signup new user
        const signUpCommand = new SignUpCommand({
            ClientId: process.env.AWS_COGNITO_APP_CLIENT_ID,
            Username: data.email,
            Password: data.password
        });
        const signUpCommandResponse = await client.send(signUpCommand);
        const authorizeSubId = signUpCommandResponse.UserSub;

        /**
         * implement user account confirmation functionality after setting up email later
         * */ 

        // confirm user using admin API
        const adminConfirmSignUpCommand = new AdminConfirmSignUpCommand({
            UserPoolId: process.env.AWS_USER_POOL_ID,
            Username: authorizeSubId
        });
        const adminConfirmSignUpResponse = await client.send(adminConfirmSignUpCommand);
        console.log('confirmed', adminConfirmSignUpResponse);

        // Create new attribute object in MongoDB
        const createdUser = await user.createUser({
            email: data.email,
            subId: authorizeSubId as string
        });
        console.log('created user object', createdUser);

        return {
            createdUser,
            adminConfirmSignUpResponse
        }

    } catch(error) {
        throw error;
    }
}

const signIn = async (data: User) => {
    try {
        const client = new CognitoIdentityProvider({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
            }
        });

        // retrieve user tokens
        const adminInitiateAuthCommand = new AdminInitiateAuthCommand({
            AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
            AuthParameters: {
                USERNAME: data.email,
                PASSWORD: data.password
            },
            ClientId: process.env.AWS_COGNITO_APP_CLIENT_ID,
            UserPoolId: process.env.AWS_USER_POOL_ID
        });
        const adminInitiateAuthResponse = await client.send(adminInitiateAuthCommand);

        // get user details
        const getUserCommand = new GetUserCommand({
            AccessToken: adminInitiateAuthResponse.AuthenticationResult?.AccessToken
        });
        const getUserResponse = await client.send(getUserCommand);

        // construct the response
        const email = getUserResponse.UserAttributes?.find(element => element.Name === "email")?.Value;
        const subId = getUserResponse.UserAttributes?.find(element => element.Name === "sub")?.Value;
        const attributeData = {
            email,
            subId
        }

        // extract tokens
        const accessToken = adminInitiateAuthResponse.AuthenticationResult?.AccessToken;
        const refreshToken = adminInitiateAuthResponse.AuthenticationResult?.RefreshToken;
        const idToken = adminInitiateAuthResponse.AuthenticationResult?.IdToken;

        return {
            data: attributeData,
            tokens: {
                accessToken,
                refreshToken,
                idToken
            }
        }

    } catch (error) {
        console.log(error);
    }
}

const verifyAuth = async (cookies: any) => {
    try {
        const client = new CognitoIdentityProvider({
            region: process.env.AWS_COGNITO_REGION,
            credentials: {
                accessKeyId: process.env.AWS_COGNITO_REGION as string,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
            }
        });

        // validate access token and get user details
        const getUserCommand = new GetUserCommand({
            AccessToken: cookies.AccessToken
        });
        const getUserResponse = await client.send(getUserCommand);

        // construct the response
        const email = getUserResponse.UserAttributes?.find(element => element.Name === "email")?.Value as string;
        const subId = getUserResponse.UserAttributes?.find(element => element.Name === "sub")?.Value as string;
        const getUserAttributesBySubId = await user.getUserBySubId(subId);
        const attributeData = {
            email,
            subId,
            _id: getUserAttributesBySubId?._id.toString()
        }

        return attributeData;

    } catch (error) {
        console.log(error);
    }
}

const getUserBySubId = async (subId: string) => {
    try {
        const userBySubId = await user.getUserBySubId(subId);
        return userBySubId;
    } catch (error) {
        console.log(error);
    }
}

const refreshTokens = async (RefreshToken: string) => {
    try {
        const client = new CognitoIdentityProvider({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
            }
        });

        const command = new InitiateAuthCommand({
            AuthFlow: "REFRESH_TOKEN_AUTH",
            AuthParameters: {
                RefreshToken: RefreshToken,
            },
            ClientId: process.env.AWS_COGNITO_APP_CLIENT_ID
        });

        // Retrieve refreshed access & id tokens
        const initiateAuthCommandResponse = await client.send(command);
        console.log('new tokens assigned', initiateAuthCommandResponse);
        return initiateAuthCommandResponse;
    } catch (error) {
        throw error;
    }
}

export = {
    createUser,
    signIn,
    verifyAuth,
    getUserBySubId,
    refreshTokens
}