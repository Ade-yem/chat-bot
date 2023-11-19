import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

const createToken = (id: string, email: string, expiresIn: string | number) => {
  const payload = {id, email};
  const token = jwt.sign(payload, process.env.SECRET_KEY || "", {
    expiresIn
  });
  return token;
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  if (!token || token.trim() === "") return res.status(401).json({message: "Invalid token"});
  return new Promise<void>((resolve, reject) => {
    return jwt.verify(token, process.env.SECRET_KEY || "", (err, success) => { // check
      if (err) {
        reject(err)
        return res.status(401).json({message: "token expired"});
      } else {
        resolve();
        res.locals.jwtData = success;
        return next();

      }
    })
  })
}

export { createToken, verifyToken };