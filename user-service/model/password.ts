import bcryptjs from "bcryptjs";

const rounds = 10;

export function hashPassword(password: string) {
  return bcryptjs.hashSync(password, rounds);
}

export function comparePasswordAndHash(password: string, hash: string) {
  return bcryptjs.compareSync(password, hash);
}
