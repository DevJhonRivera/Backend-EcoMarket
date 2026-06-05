import jwt from "jsonwebtoken";
import { JWT_SECRET } from './../config.js';

const generateToken = (id, role) => {
  return jwt.sign(
    {
      id,
      role,
    },JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export default generateToken;