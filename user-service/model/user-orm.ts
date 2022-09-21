import { comparePasswordAndHash, hashPassword } from "./password";
import {
  createUser,
  deleteUser,
  findUser,
  updatePassword,
  updateSession,
} from "./repository";
import { createAccessToken, createRefreshToken, checkToken } from "./auth";
import { UserData } from "./user-model";
import { v4 as uuidv4 } from "uuid";

interface Tokens {
  username: string;
  session: string;
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
    const session = uuidv4();
    return {
      username: user.username,
      session: session,
      accessToken: createAccessToken(user),
      refreshToken: createRefreshToken(user, session),
    };
  } else {
    return null;
  }
}

export async function ormRefreshAccessToken(refreshToken: string) {
  try {
    const data = checkToken(refreshToken);
    const user = await findUser(data.username);
    if (!user || user.session !== data.session) {
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

export async function ormUpdateSession(username: string, session: string) {
  const updatedUser = await updateSession(username, session);
  return updatedUser;
}
