import Chats from './Chats'
import Contacts from './Contacts'
function Sidebar({handleClick}) {

  return (
    <section style={{height:'100%', width:"25vw"}} >
      <Chats handleClick={handleClick}/>
    </section>
  )
}

export default Sidebar