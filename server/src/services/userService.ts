import user from '../database/user';
import { CognitoIdentityProvider, SignUpCommand } from '@aws-sdk/client-cognito-identity-provider';
import { SignUpCommand } from '@aws-sdk/client-cognito-identity-provider/dist-types/commands/SignUpCommand';

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

        // const createdUser = await user.createUser(data);
        // return createdUser;
    } catch(error) {
        throw error;
    }
}

export = {
    createUser
}