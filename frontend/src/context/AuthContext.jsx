import { createContext, useEffect, useState } from "react";
import authService from "../services/auth.service";
import {
  saveToken,
  saveUser,
  getToken,
  getUser,
  clearStorage,
} from "../utils/storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (token) {
      const storedUser = getUser();

      if (storedUser) {
        setUser(storedUser);
      }
    }

    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const response = await authService.login(credentials);

    saveToken(response.token);
    saveUser(response.user);

    setUser(response.user);

    return response;
  };

  const register = async (data) => {
    return await authService.register(data);
  };

  const logout = () => {
    clearStorage();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};