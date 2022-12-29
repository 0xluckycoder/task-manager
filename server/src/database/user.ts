import UserEntry from "../models/UserEntry"

type User = {
    email: string,
    password: string
}

const createUser = async (data: User) => {
    try {
        const userEntry = new UserEntry(data);
        const createdUserEntry = await userEntry.save();
        return createdUserEntry;
    } catch (error) {
        throw error;
    }
}

export = {
    createUser
}