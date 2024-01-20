import io from 'socket.io-client'
import React, {useContext, useEffect, useState} from 'react';
import { useUser } from './UserContext';

const SocketContext = React.createContext();
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({children}) =>{
    console.log("Socket Provider");
    const {user} = useUser();
    const [socket, setSocket] = useState(null);

useEffect(()=>{
    console.log("Socket Provider Use Effect");
    console.log("type of user id", typeof user.id)
    const newSocket = io('https://chat-app-api-9cgh.onrender.com', {
        query:{
            id: user.id
        }
    })
    setSocket(newSocket);
    return ()=>newSocket.close();
},[user.id])
    return (<SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>)
}
