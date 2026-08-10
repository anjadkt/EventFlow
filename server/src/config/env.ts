import { ApiError } from '@/utils/ApiError.js';
import dotenv from 'dotenv'
dotenv.config();

const getEnv = (key: string) => {

  const env = process.env[key];
  if (!env) throw new ApiError(404, "env not found!");

  return env;
}


export const env = {
  PORT: getEnv("PORT"),
  CLIENT_URL: getEnv("CLIENT_URL"),
  JWT_ACCESS_SECRET: getEnv("JWT_ACCESS_SECRET"),
  JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),
  BCRYPT_SALT: getEnv("BCRYPT_SALT"),
  ACCESS_EXPIRY: getEnv("ACCESS_EXPIRY"),
  REFRESH_EXPIRY: getEnv("REFRESH_EXPIRY"),
  NODE_ENV: getEnv("NODE_ENV")
}