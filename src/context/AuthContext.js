// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [completeProfile, setCompleteProfile] = useState(null);
  const [successfulCreation, setSuccessfulCreation] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token && !user) {
  //     fetchProfile();
  //   }
  // }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    await fetchProfile();
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data.token);

      setSuccessfulCreation(true);
      return true;
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);

      setSuccessfulCreation(false);
      return false;
    }
  };

  const fetchProfile = async () => {
    try {
      const { data: profile } = await api.get("/users/me");
      setUser(profile);
      console.log(profile);

      const isComplete =
        Boolean(profile.first_name) &&
        Boolean(profile.last_name) &&
        Boolean(profile.country) &&
        Boolean(profile.city) &&
        Boolean(profile.phone_number) &&
        Boolean(profile.date_of_birth);

      setCompleteProfile(isComplete);

      return true;
    } catch (err) {
      console.error("Fetch profile error:", err.response?.data || err.message);
      localStorage.removeItem("token");
      setUser(null);
      setCompleteProfile(null);
      return false;
    }
  };
  const resetSuccessfulCreation = () => {
    setSuccessfulCreation(null);
  };
  const completeProfileFunc = async (
    first_name,
    last_name,
    profile_picture,
    country,
    city,
    phone_number,
    birthDate
  ) => {
    try {
      const token = localStorage.getItem("token");
      await api.put(
        "/users/me/completeProfile",
        {
          first_name,
          last_name,
          profile_picture,
          country,
          city,
          phone_number,
          birthDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchProfile();
      return true;
    } catch (err) {
      console.error(
        "Complete profile error:",
        err.response?.data || err.message
      );
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setCompleteProfile(null);
    setSuccessfulCreation(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        completeProfile,
        successfulCreation,
        login,
        register,
        fetchProfile,
        completeProfileFunc,
        logout,
        resetSuccessfulCreation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
