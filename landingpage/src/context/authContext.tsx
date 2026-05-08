"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the context value
interface AuthContextType {
  isLoginPopupOpen: boolean;
  toggleLoginPopup: () => void;
}

// Create the context with an initial undefined type, which will be set by the provider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Define the type for the props of the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component with type definition for props
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);

  const toggleLoginPopup = () => {
    setLoginPopupOpen(!isLoginPopupOpen);
  };

  return (
    <AuthContext.Provider value={{ isLoginPopupOpen, toggleLoginPopup }}>
      {children}
    </AuthContext.Provider>
  );
};
