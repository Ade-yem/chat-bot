import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("user/login", {email, password});
  if (res.status !== 200) {
    console.log(res.data)
    throw new Error("Unable to login");
    
  }
  const data = await res.data;
  return data;
}

export const registerUser = async (name: string, email: string, password: string) => {
  const res = await axios.post("user/register", {name, email, password});
  if (res.status !== 201) {
    console.log(res.data)
    throw new Error("Unable to register user");
    
  }
  const data = await res.data;
  return data;
}

export const logoutUser = async () => {
  const res = await axios.post("user/logout");
  if (res.status !== 200) {
    console.log(res.data)
    throw new Error("Unable to logout");
    
  }
  const data = await res.data;
  return data;
}

export const authStatus = async () => {
  const res = await axios.get("user/status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
}

export const sendChat = async (message: string) => {
  const res = await axios.post("chat/new", { message });
  if (res.status !== 201) {
    throw new Error("An error has occured");
  }
  const data = await res.data;
  return data;
}

export const getChats = async () => {
  const res = await axios.get("chat/get_chats");
  if (res.status !== 200) {
    throw new Error("An error has occured");
  }
  const data = await res.data;
  return data;
}

export const deleteChats = async () => {
  const res = await axios.delete("chat/delete_chats");
  if (res.status !== 200) {
    throw new Error("An error has occured");
  }
  const data = await res.data;
  return data;
}