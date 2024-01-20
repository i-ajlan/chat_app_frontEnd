import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Conversations from './Conversations'
import LoginRegistration from './LoginRegistration';
import { useUser } from './contexts/UserContext';
import { useContact } from './contexts/ContactContext';
import Contacts from './Contacts';
import axios from 'axios';

function App() {
  console.log("App Component");
  const{setContacts, contacts} = useContact()
  const {user, token} = useUser();
  const [toContacts, setToContacts] = useState(false);


  const handleClick = async () => {
    try{
      const {data} = await axios.get('https://chat-app-api-9cgh.onrender.com/api/v1/contact',{
        headers:{
          Authorization: token
        }
      })
      console.log(data)
      setContacts(data)
      setToContacts(true)
    } catch(err){
      console.log(err)
    }
  }
  return (<>
  
  {
     (token && user.id)?
      <div style={{height:'100vh',width:'100vw', display:'flex',
      justifyContent:'space-around', padding:'1%'}}>
     <Sidebar />
     <Conversations token={token}/>
     {toContacts && <Contacts setToContacts={setToContacts} token={token}/>}
     <button style={{position: 'absolute', bottom:'1.5%', right:'75%'}} onClick={handleClick}>go to Contacts</button>
      </div>:
     <LoginRegistration />
    }
  </>
   
  )
}

export default App
