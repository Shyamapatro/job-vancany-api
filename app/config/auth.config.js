import { config } from "dotenv";
config();

const authConfig = {
  secret: process.env.JWT_SECRET,
};
export { authConfig };
