import { NextFunction, Request, Response } from "express";
import User from "../models/user.js";
import { configureOpenAI } from "../config/openai-config.js";
import OpenAIApi from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

class ChatController {
  static async generateChat(req: Request, res: Response, next: NextFunction) {
    const { message } = req.body;
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) return res.status(401).json({ message: "User does not exist or invalid token" });

    // get all user chats and send it + new one to api and get response
    const chats: ChatCompletionMessageParam[] = user.chats.map(({ role, content }) => ({ role: role as "user" | "assistant", content }));
    chats.push({ content: message, role: "user" });
    
    console.log(chats)
    const config = configureOpenAI();
    const openai = new OpenAIApi({apiKey: config.apiKey, organization: config.organization});
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: chats
      });
      user.chats.push({ content: message, role: "user" });
      user.chats.push(response.choices[0].message);
      await user.save();

      // Handle the response here, for example:
      return res.status(201).json({ message: "Chat generated successfully", chats: user.chats });
    } catch (error) {
      // Handle errors here, for example:
      console.error("Error generating chat:", error);
      res.status(500).json({ message: "Error generating chat" });
    }
  }

  static async getChats(req: Request, res: Response, next: NextFunction) {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) return res.status(401).json({ message: "User does not exist or invalid token" });
    return res.status(200).json({message: "success", chats: user.chats})
  }

  static async deleteChats(req: Request, res: Response, next: NextFunction) {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) return res.status(401).json({ message: "User does not exist or invalid token" });
    //@ts-expect-error
    user.chats = [];
    user.save();
    return res.status(201).json({message: "delete successfull", chats: []})
  }
}

export default ChatController;
