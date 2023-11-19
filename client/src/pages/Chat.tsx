import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { deleteChats, getChats, sendChat } from "../helpers/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


type Message = {
  role: "user"| "assistant";
  content: string;
}

const Chat = () => {
  const auth = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const navigate = useNavigate()
  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const chat: Message = {role: "user", content};
    setMessages((prev) => [...prev, chat])
    const data = await sendChat(content);
    setMessages([...data.chats])
  }
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth?.user) {
      toast.loading("Loading chats...", {id: "load"})
      getChats().then(data => {
        setMessages([...data.chats]);
        toast.success("Chats loaded successfully", {id: "load"})
      }).catch((error) => {
        console.error(error);
        toast.error("Loaded failed", {id: "load"})
      })
    }

  }, [auth]);

  useEffect(() => {
    if (!auth?.isLoggedIn) {
      return navigate("/login");
    }
  }, [auth, navigate])
  const handleDelete = async () => {
    try {
      toast.loading("Deleting chats", {id: "del"})
      await deleteChats();
      setMessages([]);
      toast.success("Deleting chats successful", {id: "del"})
    } catch (error) {
      console.log(error)
      toast.error("Deleting chats failed", {id: "del"})
    }
  }
  
  return ( 
       <Box sx={{display: "flex", flex: 1, width: "100%", height: "100%", gap: 3}}>
        <Box sx={{display: {md: "flex", sm: "flex", xs: "none"}, flex: 0.3, flexDirection: "column", textAlign: "center", position: "fixed", left: 0, width: "300px"}}>
          <Box sx={{display: "flex", flexDirection: "column", height: "100vh", width: "100%", bgcolor: "#51538f", borderRadius: 5 }}>
            <Avatar sx={{mx: "auto", my: 2, bgcolor: "white", color: "black", fontWeight: 700}}>
              {auth?.user?.name[0]} 
              {/* {auth?.user?.name.split(" ")[1]} */}
            </Avatar>
            <Typography sx={{mx: "auto" }}>You are talking to a OpenAI's ChatGPT!</Typography>
            <Typography sx={{mx: "auto", p: "6px", my: "auto" }}>Stop playing!!! </Typography>
            <Typography sx={{mx: "auto", p: "6px" }}>You can ask me any question whether medical questions or current affairs, I have got the answers for you. </Typography>
            <Button sx={{width: "200px", my: "auto", color: "white", mx: "auto", bgcolor: red[400], ":hover": {
              bgcolor: red[100]
            }}} onClick={handleDelete}>Clear conversation</Button>
          </Box>
        </Box>
        <Box sx={{display: "flex", flex: {md: 1, sm: 1, xs: 1}, flexDirection: "column", justifyContent: "center", px: "3", pt: 1, ml: {sm: "300px", md: "300px"}}}>
          <Typography sx={{textAlign: "center", fontSize: "35px", mx: "auto", color: "white", mb: 2 }}>Model - GPT 3.5 Turbo</Typography> 
          <Box sx={{width: "100%", borderRadius: 3, mx: "auto", display: "flex", flexDirection: "column", overflowX: "hidden", scrollBehavior: "smooth"  }}>
            {
              messages.map((message, index) => (
                <ChatItem content={message.content} role={message.role} key={index} />
              ))
            }
          </Box>
          <Box sx={{width: "100%", height: "20vh"}}></Box>
          <Box sx={{width: {xs: "90%", sm: "60%", md: "70%"}, p: 1.5, mx: 2.5, borderRadius: 4, bgcolor: "#51538f", display: "flex", position: "fixed", bottom: "15px",  }}>
            <input ref={inputRef} type="text" placeholder="Send a message" style={{width: "100%", backgroundColor: "transparent", border: "none", outline: "none", fontSize: "20", color: "white", flex: 2 }} />
            <IconButton sx={{ml: "auto", color: "white"}} onClick={handleSubmit}> <IoMdSend/> </IconButton>
          </Box>

        </Box>
       </Box> 
  );
}
 
export default Chat;