import {useState} from 'react'
import { useContact } from './contexts/ContactContext';
import { useConversation } from './contexts/ConversationContext';
import { useUser } from './contexts/UserContext';
import { Avatar } from '@mui/material';

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
    <section className="conversations" style={{height:'100%', width:'65vw', border:'1px black solid', display:'flex', flexDirection:'column', background:'white', borderRadius:'10px'}}>
      <section className="conversations_head" style={{borderBottom:'1px black solid', padding:'5px'}}>
        <h2>conversations</h2>
        <div className="user_image_name" style={{display:'flex', gap:'5px'}}>

        <Avatar alt=''/>
        <p>{selectedContact.name_contact}</p>
        </div>
        </section>
        <section className='conversations_body' style={{display:'flex', flexDirection:'column',
        flex:'1', overflowY:'scroll'
      }}>

        {
          messages.map((message,index)=>{
            
            if((message.sender != user.id || message.receiver != selectedContact.contact_id) && (message.sender != selectedContact.contact_id || message.receiver != user.id)){
              return;
            }
   return(<input key={index} type="text" value={message.content} style={message.sender == user.id? {margin:'5px', alignSelf:'end'}:{margin:'5px', alignSelf:'start'}}/>)

          }

          )
       

          // <input type="text" value={"messageSent"} style={{alignSelf:'end'}}/>
        }
        </section>
        <section style={{borderTop:'1px black solid', display:'flex'}}className='conversations_foot'>
          <input type="text" placeholder='write a message...' style={{flex:'0', border:'none', outline:'none'}} value={value} onChange={(e)=>setValue(e.target.value)}/>
          <button onClick={sendMessage}>Send</button>

        </section>
        

    </section>
  )
}

export default Conversations