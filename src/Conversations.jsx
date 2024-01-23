import {useState} from 'react'
import { useContact } from './contexts/ContactContext';
import { useConversation } from './contexts/ConversationContext';
import { useUser } from './contexts/UserContext';
import { Avatar } from '@mui/material';
import './css/Conversations.css';

function Conversations() {
  console.log("Conversation Component");
  const [value, setValue] = useState('');
  const {selectedContact} = useContact();
  const {messages, createMessage} = useConversation();
  const {user} = useUser();
  const sendMessage = () => {
    createMessage({sender:user.id,receiver:selectedContact.contact_id, content:value});
    // console.log(typeof selectedContact.contact_id);
    setValue('')
  }

  return (
    <section className="conversations">
      <section className="conversations__head">
        <h2>conversations</h2>
        <div className="user_image_name" style={{display:'flex', gap:'5px'}}>

        <Avatar alt=''/>
        <p>{selectedContact.name_contact}</p>
        </div>
        </section>
        <section className='conversations__body' style={{display:'flex', flexDirection:'column',
        flex:'1', gap:'5px', overflowY:'scroll'
      }}>

        {
          messages.map((message,index)=>{
            
            if((message.sender != user.id || message.receiver != selectedContact.contact_id) && (message.sender != selectedContact.contact_id || message.receiver != user.id)){
              return;
            }
   return(<input key={index} type="text" value={message.content} className={message.sender == user.id? 'user_message': 'contact_message'} readOnly/>)

          }

          )
       

          // <input type="text" value={"messageSent"} style={{alignSelf:'end'}}/>
        }
        </section>
        <section style={{ display:'flex', justifyContent:'center'}}className='conversations__foot'>
          <textarea type="text" placeholder='write a message...' value={value} onChange={(e)=>setValue(e.target.value)}/>
          <button onClick={sendMessage}>Send</button>

        </section>
        

    </section>
  )
}

export default Conversations