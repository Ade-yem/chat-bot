import { Box, Button, Typography } from '@mui/material';
import thinker from "../assets/thinking.png";
import CustomInput from '../components/shared/CustomInput';
import { FiLogIn } from "react-icons/fi";
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const auth = useAuth()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Logging in", {id: "login"});
      await auth?.login(email, password);
      toast.success("Login successful", {id: "login"});
    } catch (error) {
      toast.error("Login failed", {id: "login"});
      console.error(error)
      // throw new Error("unable to login"); 
    }  
  }
  useEffect(() => {
      if (auth?.isLoggedIn) navigate("/login")
    }, [auth, navigate])
  
  return ( 
    <>
       <Box sx={{display: "flex", flex: "1", height: "100%", width: "100%"}}>
        <Box sx={{pt: 2, display: {xs: "none", sm: 'none', md: 'flex'}}}>
          <img src={thinker} alt="thinking robot" width={"400px"} height={"544px"} />
        </Box>
        <Box sx={{display: "flex", flex: {xs: 1, md: 0.5 }, justifyContent: "center", alignItems: "center", m: "auto" }}>
          <form method="get" onSubmit={handleSubmit}>
            <Box sx={{
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 4
          }}>
              <Typography variant='h4' textAlign={"center"} p={2} >Welcome back</Typography>
              <CustomInput label='Email' type='email' name='email' />
              <CustomInput label='Password' type='password' name='password' />
              <Button type='submit' sx={{width: "400px", p: "2" , borderRadius: "10px", margin: "10px", fontSize: "20px", color: "black", bgcolor: "#00ffcc", ":hover": {
                bgcolor: "#51538f", color: "white"
              }}} endIcon={<FiLogIn/>} >Login</Button>
            </Box>

          </form>
        </Box>

        </Box> 
    </>
  );
}
 
export default Login;