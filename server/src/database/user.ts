import UserEntry from "../models/UserEntry"

type User = {
    email: string,
    subId: string
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

const getUserBySubId = async (subId: string) => {
    try {
        const getUserBySubId = await UserEntry.findOne({ subId });
        return getUserBySubId;
    } catch (error) {
        throw error;
    }
}

export = {
    createUser,
    getUserBySubId
}