import { createUser, findUser } from './repository.js';
import { hashPassword, comparePasswordAndHash } from './password.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
    try {
        const passwordHash = hashPassword(password);
        const newUser = await createUser({username: username, password: passwordHash});
        await newUser.save();
        return true;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
}

export async function ormLoginUser(user, password) {
    console.log(user);
    return comparePasswordAndHash(password, user.password);
}

export async function ormFindUser(username) {
    return await findUser(username);
}
