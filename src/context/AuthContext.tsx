import React, { useState, useContext, createContext } from "react";
import { User, Credentials } from "../types/auth";
import { login } from "../services/authService";

type AuthContextType = {
    user: User | null;
    loginUser: (credentials: Credentials) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    
    async function loginUser(credentials: Credentials) {
        const { user, token } = await login(credentials);
        setUser(user);
    }

    function logout() {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loginUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}