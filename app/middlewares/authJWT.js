import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { authConfig } from "./../config/auth.config.js";
import {info} from '../utils/logger.js'
const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    info("auth failed!");
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    req.userId = decoded.id;

    next();
  });
};

export { verifyToken };
