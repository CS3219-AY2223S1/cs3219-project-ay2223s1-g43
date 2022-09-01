import { createUser, findUser } from "./repository";
import { hashPassword, comparePasswordAndHash } from "./password";
import { createUserToken } from "./auth";

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username: string, password: string) {
  try {
    const pHash = hashPassword(password);
    const newUser = createUser(username, pHash);
    await newUser.save();
    return null;
  } catch (err: any) {
    console.log(err);
    return { err };
  }
}

export function ormLoginUser(user, password: string) {
  console.log(user);
  if (comparePasswordAndHash(password, user.pHash)) {
    return createUserToken(user);
  } else {
    return null;
  }
}

export function ormFindUser(username: string) {
  return findUser(username);
}
