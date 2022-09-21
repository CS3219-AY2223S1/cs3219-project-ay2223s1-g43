import { comparePasswordAndHash, hashPassword } from "./password";
import { createUser, deleteUser, findUser, updatePassword } from "./repository";
import { createAccessToken, createRefreshToken, checkToken } from "./auth";
import { UserData } from "./user-model";

interface Tokens {
  username: string;
  accessToken: string;
  refreshToken: string;
}

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username: string, password: string) {
  try {
    const pHash = hashPassword(password);
    const newUser = createUser(username, pHash);
    await newUser.save();
    return null;
  } catch (err: any) {
    return { err };
  }
}

export async function ormDeleteUser(username: string) {
  const deletedUser = await deleteUser(username);
  return deletedUser;
}

export function ormLoginUser(user: UserData, password: string): Tokens | null {
  if (comparePasswordAndHash(password, user.pHash)) {
    return {
      username: user.username,
      accessToken: createAccessToken(user),
      refreshToken: createRefreshToken(user),
    };
  } else {
    return null;
  }
}

export async function ormRefreshAccessToken(refreshToken: string) {
  try {
    const data = checkToken(refreshToken);
    const user = await findUser(data.username);
    if (!user) {
      return null;
    }
    return {
      username: user.username,
      accessToken: createAccessToken(user),
    };
  } catch (err) {
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
