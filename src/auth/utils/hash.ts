import bcrypt from 'bcrypt';
const SALT_ROUNDS = 10;

export const compareHash = async (
  str: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(str, hash);
};

export const hashString = async (str: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(str, salt);
};
