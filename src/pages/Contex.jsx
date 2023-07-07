import React, { createContext, useState } from "react";

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {

    const [token, setToken] = useState('');
    const [nome, setNome] = useState();
    return (
        <AuthContext.Provider value={{
            token, setToken,
            nome, setNome
            }}>
            {children}
        </AuthContext.Provider>
    )
}

