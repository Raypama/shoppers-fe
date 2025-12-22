"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: number;
  full_name: string;
  email: string;
  nickname: string;
  profile_image: string;
  adresses: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");

    if (t && u) {
      setToken(t);
      setUser(JSON.parse(u));
    }
  }, []);

const login = (data: { user: any; token: string }) => {
  localStorage.setItem("token", data.token); // ✅ FIX
  localStorage.setItem("user", JSON.stringify(data.user));
  setToken(data.token);
  setUser(data.user);
};



  const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setToken(null);
  setUser(null);
  window.location.href = "/auth/login"; // ⬅️ biar clean
};


  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
