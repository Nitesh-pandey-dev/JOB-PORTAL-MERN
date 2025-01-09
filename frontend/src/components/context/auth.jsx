import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [token,setToken] = useState([]);
    const [isLogin,setIsLogin] = useState(false);
    const [alljobs,setAllJobs] = useState([]);
    useEffect(()=>{
        const data = localStorage.getItem('token');
        console.log(data);
        if(data) setToken(data)
    },[])
    return(
        <AuthContext.Provider value={{token,setToken,isLogin,setIsLogin,alljobs,setAllJobs}}>
            {children}
        </AuthContext.Provider>
    )
}
export {AuthContext,AuthProvider}