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
    loading: boolean;
    setUser: (user: User | null) => void;
    authenticateUser: () => Promise<void>;
    logout : () => void ;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<User | null>(null);
    const [loading,setLoading] = useState(true);

    const authenticateUser = async () => {
        try {
            const user = await getProfile();
            setUser({
                id: user.id,
                name: user.name,
                email: user.email
            });
        } catch (err: any) {
            console.log("Failed to load profile:", err);
            setUser(null);
        }finally{
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
    }

    useEffect(() => {
        authenticateUser();
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                logout,
                authenticateUser,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}