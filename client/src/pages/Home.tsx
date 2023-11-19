import { Box } from "@mui/material";
import Typing from "../components/Type";

const Home = () => {
  return ( 
    <Box width={"100%"} height={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Box marginTop={"30vh"}>
        <Typing/>
      </Box>
      {/* <Box sx={{display: "flex", width: "100%", flexDirection: {sm:"column", md: "row"}, alignItems: "center", gap: 5, mx: "auto", mt: "3"}}>
        <Typing/>
      </Box> */}

    </Box>
  );
}
 
export default Home;