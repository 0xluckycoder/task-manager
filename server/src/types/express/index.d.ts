import { User } from "../custom";

export {};

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}