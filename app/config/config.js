import { config } from "dotenv";
config();

const clientUrl = process.env.CLIENT_URL;
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DB_NAME,
};

const appConfig = {
  clientUrl,
  env: process.env.NODE_ENV,
};
export { dbConfig, appConfig };
