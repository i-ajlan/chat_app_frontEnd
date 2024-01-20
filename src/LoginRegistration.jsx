import  { useState } from 'react'
import { useUser } from './contexts/UserContext';
import axios from 'axios';

export default function LoginRegistration() {
  
    console.log("Login Registration Component");
    const [value, setValue] = useState({name:'',id:''});
    const {setUser,setToken} = useUser();
    const [isRegistered, setIsRegistered] = useState(false);
    const [message, setMessage]=useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name:username, id} = value;
        try{
        const {data} = await axios.post(`https://chat-app-api-9cgh.onrender.com/api/v1/${isRegistered?'login':'register'}`,{username, id: parseInt(id)})
        
       
        if(data.token){
          setUser({username, id:parseInt(id)});
          localStorage.setItem('token_chat_app',`Bearer ${data.token}`)
          setToken(localStorage.getItem('token_chat_app'))
        }

      }catch(err){

          console.log("err: "+err);
          setMessage("This username or id already exists")
        }
        
    }

    const handleClick = () => {
      setIsRegistered(!isRegistered);
    }


  return (
    <div style={{display:'flex', justifyContent:'center',alignItems:'center', height:"100vh"}}>
        <form action="" onSubmit={handleSubmit}
        style={{display:'flex', flexDirection:'column', gap:'5px', boxShadow:'0 0 5px rgba(0, 0, 0, 0.7)', padding:'60px', backgroundColor:'white'}}
        >
        <div className='elem_form'>
        <label htmlFor="name">name: </label>
        <input 
        type="text" 
        name="" 
        id="name" 
        style={{border:'none', borderBottom:'1px black solid', width:'100%', outline:'none'}}
        value={value.name}onChange={(e)=>{setValue((prevValue)=>{return{...prevValue, name:e.target.value}})}}
        
        />

        </div>
        <div className='elem_form'>
        <label htmlFor="uniqueID">uniqueID: </label>
        <input 
        type="text" 
        name="" 
        id="uniqueID" 
         style={{border:'none', borderBottom:'1px black solid', width:'100%', outline:'none'}}
        value={value.id} onChange={(e)=>{setValue((prevValue)=>{return{...prevValue, id:e.target.value}})}}/>

        </div>
        <button style={{fontSize:'1.25em', color:'white', backgroundColor:'blue', borderRadius:'25px', border:'1px white solid', padding:'3%'}} type="submit">{isRegistered?'Login':'Register'}</button>
        <p style={{textAlign:'center', color:'blue', cursor:'pointer'}} onClick={handleClick}>{isRegistered?'Go back to Register':'Already Have a Account?'}</p>
        <p style={{color:'red'}}>{message}</p>
        </form>
       
    </div>
  )
}
