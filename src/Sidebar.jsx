import React, { useState } from 'react'
import Chats from './Chats'
import Contacts from './Contacts'
function Sidebar() {

  return (
    <section style={{height:'100%', width:"25vw"}}>
      <Chats />
    </section>
  )
}

export default Sidebar