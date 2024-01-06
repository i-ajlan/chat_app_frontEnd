import React, { useContext, useState } from 'react'




const UserContext = React.createContext();

export const useUser = () => useContext(UserContext);


export const UserProvider = ({children}) => {
    console.log("User Provider");
    const [user, setUser] = useState({name:'', id:''});
    const [token, setToken] = useState();

    return <UserContext.Provider value={{user, setUser, setToken, token}}>
        {children}
    </UserContext.Provider>
}