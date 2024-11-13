import Sequelize from "sequelize";
import dotenv from "dotenv";
import { dbConfig } from "./app/config/config.js";
dotenv.config();
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: "mysql",
    dialectOptions: {
      charset: "utf8mb4",
    },
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
    define: {
      underscored: true,
    },
  }
);

const connectDB = async () => {
  try {
    sequelize
      .authenticate()
      .then(() => {
        sequelize.sync();
        console.log("Connection has been established successfully.");
      })
      .catch((err) => {
        console.log("Unable to connect to the database:", err);
      });
  } catch (err) {
    console.log("Unable to connect to the database:", err);
  }
};

const disconnectDB = async () => {
  try {
    console.log("Database connection closed successfully.");
    await sequelize.close();
    
  } catch (err) {
    console.error("Error closing the database connection:", err);
  }
};
export { sequelize, connectDB, disconnectDB };
