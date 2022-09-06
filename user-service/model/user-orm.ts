import { comparePasswordAndHash, hashPassword } from "./password";
import { createUser, findUser, updatePassword } from "./repository";
import { createUserToken } from "./auth";
import { UserData } from "./user-model";

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

export function ormLoginUser(user: UserData, password: string) {
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

export async function ormUpdatePassword(username: string, newPassword: string) {
  const newPHash = hashPassword(newPassword);
  const updatedUser = await updatePassword(username, newPHash);
  return updatedUser;
}
