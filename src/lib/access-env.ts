export const SALT_ROUNDS=  process.env.BCRYPT_SALT && parseInt(process.env.BCRYPT_SALT) || 10;
export const DB_URL = process.env.NEXT_PUBLIC_DATABASE_URL ;
export const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!;