import { NextFunction, Request, Response } from "express";
import User from "../models/user.js";
import {hash, compare} from 'bcrypt';
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

class userController {
  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find()
      res.status(200).json({message: 'OK', users})

    } catch (error) {
      console.log(error)
      res.status(400).json({message: "Error", cause: error})
    }
  }
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const pwd = await hash(password, 10)
      const user = await User.findOne({email})
      if (!user) {
        const newUser = new User({ name, email, password: pwd });
        await newUser.save()
        res.clearCookie(COOKIE_NAME, {
          path: "/", domain: "localhost", httpOnly: true, signed: true
        })
        const token = createToken(newUser._id.toString(), email, "7d");
        const time = new Date()
        time.setDate(time.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
          path: "/", domain: "localhost", expires: time, httpOnly: true, signed: true
        });
        return res.status(201).json({message: 'User created successfully', email: newUser.email, name: newUser.name})
      } else {
        return res.status(401).json({message: "User already exist"})
      }
    } catch (error) {
      console.error(error)
      res.status(400).json({message: "Error", cause: error})
    }
  }

  static async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({email});
      if (!user) return res.status(401).json({message: "User does not exist"});
      if (! await compare(password, user.password)) return res.status(401).json({message: "Incorrect password"});
      res.clearCookie(COOKIE_NAME, {
        path: "/", domain: "localhost", httpOnly: true, signed: true
      })
      const token = createToken(user._id.toString(), email, "7d");
      const time = new Date()
      time.setDate(time.getDate() + 7);
      res.cookie(COOKIE_NAME, token, {
        path: "/", domain: "localhost", expires: time, httpOnly: true, signed: true
      });
      return res.status(200).json({message: 'User logged in successfully', email: user.email, name: user.name})
    } catch (error) {
      console.log(error);
      res.status(400).json({message: "Error", cause: error});
    }
  }

  static async verifyUser(req: Request, res: Response, next: NextFunction) {
    try { 
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) return res.status(401).json({message: "User does not exist or invalid token"});
      return res.status(200).json({message: 'User logged in successfully', email: user.email, name: user.name})
    } catch (error) {
      console.log(error);
      res.status(400).json({message: "Error", cause: error});
    }
  }

  static async logoutUser(req: Request, res: Response, next: NextFunction) {
    try { 
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) return res.status(401).json({message: "User does not exist or invalid token"});
      res.clearCookie(COOKIE_NAME, {
        path: "/", domain: "localhost", httpOnly: true, signed: true
      })
      return res.status(200).json({message: 'User logged out successfully'})
    } catch (error) {
      console.log(error);
      res.status(400).json({message: "Error", cause: error});
    }
  }
}

export default userController;