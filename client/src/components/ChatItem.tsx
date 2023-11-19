import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import openai from "../assets/openai.png";
import { Prism as SyntaxHighliter } from "react-syntax-highlighter";
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';


function extract(message:string) {
  if (message.includes("```")) return message.split("```");
}
function isBlock(str:string) {
  return /[/'"!;:_\]}#//]/.test(str);
}

const ChatItem = ({ content, role }: {
  content: string;
  role: "user" | "assistant";
}) => {
  const blocks = extract(content);
  const auth = useAuth();
  return role === "assistant" ? (
    <Box sx={{display: "flex", justifyContent: "flex-start", p: 2, bgcolor: "#1A092B", gap: 2, my: 2}}>
      <Avatar variant="rounded" sx={{height: 40, width: 40, ml: "0"}} src={openai} alt="openai" />
      <Box>
        {
          !blocks && (<Typography sx={{fontSize: "20px", color: "white"}}> {content} </Typography>)
        }
        {
          blocks && blocks.length && blocks.map((block) => isBlock(block) ? (
          <SyntaxHighliter style={coldarkCold} language={block.split(" ")[0]}>{block}</SyntaxHighliter>) : (
          <Typography sx={{fontSize: "20px", color: "white"}}> {content} </Typography>))
        }
      </Box>
    </Box> 
  ) : (
    <Box sx={{display: "flex", justifyContent: "flex-start", p: 2, bgcolor: "#2B091A", gap: 2, my: 2}}>
      <Avatar variant="rounded" sx={{height: "40px", width: "40px", ml: "0", borderRadius: "none"}}> {auth?.user?.name[0]}  </Avatar>
      <Box>
        {
          !blocks && (<Typography sx={{fontSize: "20px", color: "white"}}> {content} </Typography>)
        }
        {
          blocks && blocks.length && blocks.map((block) => isBlock(block) ? (
          <SyntaxHighliter style={coldarkCold} language={block.split(" ")[0]}>{block}</SyntaxHighliter>) : (
          <Typography sx={{fontSize: "20px", color: "white"}}> {content} </Typography>))
        }
      </Box>
    </Box> 
  )
}
 
export default ChatItem;