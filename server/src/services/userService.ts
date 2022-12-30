import user from '../database/user';
import { CognitoIdentityProvider, SignUpCommand, AdminConfirmSignUpCommand, AdminInitiateAuthCommand, GetUserCommand } from '@aws-sdk/client-cognito-identity-provider';

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

        // console.log(signUpCommandResponse, '🐻');

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

// const signIn = async (data: User) => {
//     try {
//         const client = new CognitoIdentityProvider({
//             region: process.env.AWS_REGION,
//             credentials: {
//                 accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
//                 secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
//             }
//         });

//         // retrieve user tokens
//         const adminInitiateAuthCommand = new AdminInitiateAuthCommand({
//             AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
//             AuthParameters: {
//                 USERNAME: data.email,
//                 PASSWORD: data.password
//             },
//             ClientId: process.env.AWS_COGNITO_APP_CLIENT_ID,
//             UserPoolId: process.env.AWS_USER_POOL_ID
//         });

//         const adminInitiateAuthResponse = await client.send(adminInitiateAuthCommand);

//         console.log(adminInitiateAuthResponse);

//         // get user details
//         const getUserCommand = new GetUserCommand({
//             AccessToken: adminInitiateAuthResponse.AuthenticationResult.AccessToken
//         });
//     } catch (error) {
        
//     }
// }

export = {
    createUser,
    // signIn
}