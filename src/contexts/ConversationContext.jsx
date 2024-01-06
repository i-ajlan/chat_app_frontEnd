import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useContact } from './ContactContext';
import { useUser } from './UserContext';
import { useSocket } from './SocketContext';



const ConversationContext = React.createContext();

export const useConversation = () => useContext(ConversationContext);


export const ConversationProvider = ({children}) => {

    const {user} = useUser();
    const {setSelectedContact, selectedContact} = useContact();
    const socket = useSocket();

    
    const [message, setMessage] = useState({sender:'', receiver:'', content:''});
    const [messages, setMessages] = useState([]);
    console.log("Conversation Provider");
    const createMessage = (newMessage) => {
        setMessages((prevMessages)=>[...prevMessages, newMessage])
        socket.emit('send-message', newMessage);
        console.log("Create Message")
    }

    useEffect(()=>{
        console.log("Conversation Provider useEffect");
        if(socket == null) return;
        socket.on('receive-message', (message)=>{
        console.log('receive-message')
        console.log(message);
        setMessage(message);
        setSelectedContact({name_contact:"some_one", contact_id:message.sender})
        setMessages((prevMessages)=>[...prevMessages, message])
    })
        return () => socket.off('receive-message')
    },[socket, message])
    
    
    return <ConversationContext.Provider value={{message, createMessage, messages}}>
        {children}
    </ConversationContext.Provider>
}