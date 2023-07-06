import React, { createContext, useState } from "react";

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {

    const [token, settoken] = useState('');
    const [nome, setnome] = useState();
    return (
        <AuthContext.Provider value={{
            token, settoken,
            nome, setnome
            }}>
            {children}
        </AuthContext.Provider>
    )
}

