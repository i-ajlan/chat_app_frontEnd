import React, { useContext, useState, useEffect, useCallback } from 'react'




const ContactContext = React.createContext();

export const useContact = () => useContext(ContactContext);


export const ContactProvider = ({children}) => {
    console.log("Contact Provider");

    const [selectedContact, setSelectedContact] = useState({name_contact:'',contact_id:''});

    const [contacts, setContacts] =useState([]);
    // console.log('render1')
    const createContact = (newContact) => {
        console.log('Create Contact');
        setContacts((prevContacts)=>[...prevContacts,newContact])
    }


    useEffect(()=>{
    },[])

    return <ContactContext.Provider value={{selectedContact, setSelectedContact, createContact, contacts, setContacts}}>
        {children}
    </ContactContext.Provider>
}