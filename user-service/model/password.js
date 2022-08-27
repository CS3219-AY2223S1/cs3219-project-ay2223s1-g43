import bcryptjs from 'bcryptjs';

const rounds = 10;

export function hashPassword(password) {
  return bcryptjs.hashSync(password, rounds);
}

export async function comparePasswordAndHash(password, hash) {
  return await bcryptjs.compare(password, hash);
}
