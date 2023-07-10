import React, { createContext, useState } from "react";

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {
    const lsUser = JSON.parse(localStorage.getItem("user"));
    const [auth, setAuth] = useState(lsUser);
    const [nome, setNome] = useState();
    return (
        <AuthContext.Provider value={{
            nome, setNome,
            auth, setAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}

