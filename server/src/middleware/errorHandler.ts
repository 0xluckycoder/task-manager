import { Request, Response, NextFunction } from "express";

const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {

    interface Errors {
        [key: string]: number
    }

    const errorTypes: Errors = {
        ValidationError: 400,
        UsernameExistsException: 400,
        UserLambdaValidationException: 400,
        UnexpectedLambdaException: 400,
        TooManyRequestsException: 400,
        ResourceNotFoundException: 400,
        NotAuthorizedException: 400,
        InvalidSmsRoleTrustRelationshipException: 400,
        InvalidSmsRoleAccessPolicyException: 400,
        InvalidPasswordException: 400,
        InvalidParameterException: 400,
        InvalidLambdaResponseException: 400,
        InvalidEmailRoleAccessPolicyException: 400,
        InternalErrorException: 400,
        CodeDeliveryFailureException: 400,
        JsonWebTokenError: 400,
        TokenExpiredError: 400,
        NotBeforeError: 400,
        InvalidAuthorization: 401, // custom error name,
        CookiesUnavailable: 400, // custom error name
        NotFound: 404, // custom error name
        ValidationFailed: 400, // custom error name,
        Unauthorized: 401
    }

    if (error instanceof Error) {
        // assign the status code
        const statusCode: number = errorTypes[error.name] ? errorTypes[error.name] : 500;

        res.status(statusCode).json({
            success: false,
            status: statusCode,
            message: error.message,
            stack: process.env.NODE_ENV === 'production' ? 'error stack is hidden in production' : error.stack
        });

    }
}

export = errorHandler;