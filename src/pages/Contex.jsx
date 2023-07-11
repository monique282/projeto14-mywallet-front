import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {
    const lsUser = JSON.parse(localStorage.getItem("user"));
    const [auth, setAuth] = useState(lsUser);
    const [nome, setNome] = useState();
    const navigate = useNavigate();

    // usar um 
    useEffect(() =>{
        if(lsUser === null) {
            navigate("/");
        } else {
            navigate("/home");
        }
    } ,[])


    return (
        <AuthContext.Provider value={{
            nome, setNome,
            auth, setAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}

