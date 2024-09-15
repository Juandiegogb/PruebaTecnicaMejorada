import { json } from "express";
import jwt from "jsonwebtoken";

export const createToken = (data) => {
  const secret = process.env.secret;
  const token = jwt.sign(JSON.stringify(data), secret);
  return token;
};

export const verify = (req, res, next) => {
  const secret = process.env.secret;
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }
  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};
