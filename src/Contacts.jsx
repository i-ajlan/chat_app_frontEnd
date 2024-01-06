
import { useContact } from './contexts/ContactContext';
import { useUser } from './contexts/UserContext';
import {Avatar} from '@mui/material';
import axios from 'axios' 



function Contacts({setToContacts}) {



    const {user, token} = useUser();
    const {setSelectedContact, contacts, createContact} = useContact();
    // const token = localStorage.getItem('token_chat_app')


    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const data = Object.fromEntries(new FormData(form))
      const values = new FormData(form).values();
      const isEmpty = [...values].includes('');
      if(isEmpty){
         document.querySelector('.contact_form').style.display = 'none'
        return;
      }
      const {name:name_contact, contactID: contact_id} = data;
      // let contact_id = parseInt(id)
      e.currentTarget.reset();
      axios.post('http://localhost:3000/api/v1/contact',{name_contact, contact_id: parseInt(contact_id)}, {headers:{
        Authorization: token 
      }}).then((res) =>{
        console.log(res);
        createContact({name_contact, contact_id: parseInt(contact_id)});
        document.querySelector('.contact_form').style.display = 'none'
      }).catch((err)=>{console.log(err);})
    }

    const handleClick = () => {
      const form = document.querySelector('.contact_form')
      form.style.display = 'flex';
    }

  return (
    <section 
      className="contacts" 
      style={{position:'absolute',
      display: 'flex',
      flexDirection:'column',
      justifyContent:'center',
      padding:'15%',
      backgroundColor:'rgba(0, 0, 0, 0.5)', width:'100vw', height:'100vh', zIndex:'5'}}>
        <section className="contacts_head" style={{borderBottom:'1px black solid', backgroundColor:'white', borderTopLeftRadius:'7px',
        borderTopRightRadius:'7px',
        display:'flex',
        gap:'5px',
        padding:'10px'
      }}>
        <h2 style={{flex:1}}>Contacts List</h2>
        <button style={{}} onClick={handleClick}>Create Contact</button>
        <button onClick={()=>setToContacts(false)}>close</button>
        </section>
        <section className="contacts_body" style={{backgroundColor:'white', overflowY:"scroll", borderBottomLeftRadius:'7px', borderBottomRightRadius:'7px', position:'relative', maxHeight:'60vh'}}>

          <ul >
            {contacts.map((contact)=>{
                // if(contact.id == user.id){
                //     return;
                // }
                return (<li key={contact.contact_id} style={{display:'flex', gap:'3px',alignItems:'center', flexWrap:'nowrap', padding:'4px'}}
            onClick={()=>setSelectedContact({contact_id:contact.contact_id, name_contact:contact.name_contact})}

            onDoubleClick={()=>setToContacts(false)}
            >
              <div>

              <Avatar sx={{color:"white", textTransform:"capitalize", backgroundColor:"blue"}}alt={contact.name_contact} src='none'/>
              </div>
              <div className="name_id" style={{display:'flex', flexDirection:'column', flexWrap:'nowrap', borderBottom: '1px black solid', overflow:'hidden', flex: 1}}>

              <p>{contact.name_contact}</p>
              <p style={{color:'lightgray'}}>{contact.contact_id}</p>
              

              </div>
              

            </li>)})}
          </ul>


                 
           
        </section>

        <div className='contact_form'
        style={{
          position:"absolute",top: '0', left:'0',  backgroundColor:"rgba(0, 0, 0, 0.3)", padding:'30%',
          display:"none",
          alignItems:"center",
          width:"100vw", height:'100vh'
        }}>

          <form action="" onSubmit={handleSubmit}
          
          style={{backgroundColor:"white", boxShadow:"0px 0px 15px rgba(0, 0, 0, 0.3)", padding:"5%",display:"flex", flexDirection:"column", borderRadius:"7px"}} >
            <div>
              <label htmlFor="name" >name: </label>
              <input type="text" name='name' id='name'/>
            </div>
            <div>
              <label htmlFor="contactID"> his ID: </label>
              <input type="text" name="contactID" id='contactID'/>
            </div>
            <button type="submit" style={{fontSize:'1.25em', color:'white', backgroundColor:'blue', borderRadius:'25px', border:'1px white solid', padding:'3%'}}>Submit</button>
          </form>
        </div>
              

      </section>

  )
}


 

export default Contacts