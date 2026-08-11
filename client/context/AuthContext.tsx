"use client";

import { getProfile } from "@/services/auth.service";
import {
    createContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

type User = {
    id: number;
    name: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    authenticateUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<User | null>(null);

    const isAuthenticated = user !== null;

    const authenticateUser = async () => {
        try {
            const data = await getProfile();
            console.log(data);
        } catch (err: any) {
            console.error("Failed to load profile:", err);
            setUser(null);
        }
    };

    useEffect(() => {
        authenticateUser();
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                authenticateUser,
                isAuthenticated,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}