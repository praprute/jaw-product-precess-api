import jwt from "jsonwebtoken";
import config from "config";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader =
    req.body.token || req.query.token || req.headers["authorization"];

  if (!bearerHeader) {
    return res.status(403).send({
      success: "ERROR",
      message: "A token is required for authentication",
    });
  }

  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];

  try {
    const decoded = jwt.verify(bearerToken, process.env.SECRET_JWT as string);
  } catch (err) {
    return res.status(401).send({
      success: "ERROR",
      message: "Invalid Token",
    });
  }
  return next();
};

export default verifyToken;
