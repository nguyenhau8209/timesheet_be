import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const hashPW = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const comparePassWordMD5 = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

const generateJwtToken = async (data, expireTime = 30) => {
  const signature = jwt.sign({ ...data }, process.env.TOKEN_SECRET, {
    expiresIn: expireTime,
  });
  return signature;
};

const decodeToken = async (token) => {
  return jwt.verify(token, process.env.TOKEN_SECRET);
};

const helperApp = {
  hashPW,
  comparePassWordMD5,
  generateJwtToken,
  decodeToken,
};

export default helperApp;
