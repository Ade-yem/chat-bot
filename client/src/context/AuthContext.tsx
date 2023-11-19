import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { authStatus, loginUser, logoutUser, registerUser } from "../helpers/api";

// create state management using react context

type User = {
  name: string;
  email: string;
}

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<UserAuth | null>(null); // creates the context
export const AuthProvider = ({ children }: { children: ReactNode }) => { // context provider(like a wrapper)
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // check if user cookies is valid, then skip login
    async function checkStatus() {
      const data = await authStatus();
      if (data) {
        setUser({email: data.email, name: data.name});
        setIsLoggedIn(true);
      }
    }
    checkStatus();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    if (data) {
      setUser({email: data.email, name: data.name});
      setIsLoggedIn(true);
    }
  };
  const register = async (name: string, email: string, password: string) => {
    const data = await registerUser(name, email, password);
    if (data) {
      setUser({email: data.email, name: data.name});
      setIsLoggedIn(true);
    }
  };
  const logout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = "/"
  };

  const value = {
    user, isLoggedIn, login, logout, register
  }
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}

export const useAuth = () => useContext(AuthContext);
