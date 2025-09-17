"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { sendRequest } from "@/utils/api";
import Cookies from "js-cookie";
interface AuthContextType {
    accessToken: string | null;
    user: IUser | null;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<IUser | null>(null);

    const login = (token: string) => {
        setAccessToken(token);
        Cookies.set("token", token, { expires: 1 });
        localStorage.setItem("accessToken", token);
    };

    const logout = () => {
        Cookies.remove("token");
        setAccessToken(null);
        setUser(null);
        localStorage.removeItem("accessToken");
    };

    useEffect(() => {
        // console.log(accessToken);
        
        const fetchUser = async () => {
            if (!accessToken) {
                setUser(null);
                return;
            }

            try {
                const res = await sendRequest<IBackendRes<IUser>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND}/odata/user/token`,
                    method: "POST",
                    body: {
                        token: accessToken,
                    },
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                // console.log(res);

                setUser(res.Data!);
            } catch (error) {
                console.error("Error in get user:", error);
                logout();
            }
        };

        fetchUser();
    }, [accessToken]);


    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        if (storedToken) {
            setAccessToken(storedToken);
        } else {
            const cookieToken = Cookies.get('token');
            if (cookieToken)
                setAccessToken(cookieToken);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};