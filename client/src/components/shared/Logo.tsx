import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import openai from "../../assets/open.png"
const Logo = () => {
  return ( 
    <div style={{
      display: "flex", marginRight: "auto", justifyContent: "space-around", alignItems: "center", gap: "7px"
    }}>
        <Link to={"/"}>
          <img src={openai} alt="openai" width={"90px"} height={"55px"} className="image-inverted" />
        </Link>
        <Typography sx={{display: {sm:"block", xs:"none"}, mr:"auto", fontWeight: "800", textShadow: "2px 2px 20px #000"}}>
            <span style={{fontSize: "20px"}}>Chat</span>Bot
        </Typography>
    </div>
  );
}
 
export default Logo;