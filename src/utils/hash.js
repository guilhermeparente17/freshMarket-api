import bcript from "bcryptjs";

export async function hashPassword(password) {
  return await bcript.hash(password, 10);
}

export async function comparePassword(password, hashedPassword) {
  return await bcript.compare(password, hashedPassword);
}
