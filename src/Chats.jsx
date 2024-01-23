import React, { useState } from 'react'
import { useContact } from './contexts/ContactContext';
import { useConversation } from './contexts/ConversationContext';
import { useUser } from './contexts/UserContext';
import { Avatar } from '@mui/material';
import './css/Chats.css';

function Chats({handleClick}) {
    console.log("Chat component");
    const {setSelectedContact} = useContact();
    const {user} = useUser();
    const {messages} = useConversation();
    const listChats = new Set();
    let chats = [];
    let myArray = [...messages];
    myArray.reverse();
    
    myArray.map((message)=>{
        const {sender, receiver, content} = message;
        // console.log(message)
        if(sender == user.id || receiver == user.id){
          if(sender !== user.id){
            if(!listChats.has(sender)){
              chats.push({id:sender,lastMessage: content})
            }
            listChats.add(sender);

          }else{
            if(!listChats.has(receiver)){
              chats.push({id:receiver,lastMessage: content})
            }
            listChats.add(receiver);
          }
        }
        return;
    })

  return (
    <section 
      className="chats" >
        <section className="chats__head" >
        <h2>chats</h2>
        <div className="user_image_name" style={{display:'flex', gap:'5px'}}>

        <Avatar />
        <p>{user.name}</p>
        </div>


        <p>{user.id}</p>
        </section>
        <section className="chats_body" style={{flexGrow:'1', position:'relative', borderBottomLeftRadius:'10px', borderBottomRightRadius:'10px'}}>
          <ul >
            {chats.map((chat,index)=>{


              return( 
            <li key={index} style={{display:'flex', gap:'3px',alignItems:'center', flexWrap:'nowrap'}}
            onClick={()=>setSelectedContact({ name_contact:chat.id, contact_id:chat.id})}
            >
              <div>

              <Avatar alt=''/>
              </div>
              <div className="name_last_message" style={{display:'flex', flexDirection:'column', flexWrap:'nowrap', borderBottom: '1px black solid', overflow:'hidden'}}>

              <p>name</p>
              <p>{chat.lastMessage}</p>
              </div>
              

            </li>)})}
           <button className='button' style={{position: 'absolute', bottom:'5px', right:'0'}} onClick={handleClick}>go to Contacts</button>
          </ul>
        </section>


      </section>

  )
}

export default Chats