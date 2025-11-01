import React from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
 

function Header({ OpenSidebar, handleNotificationClick, unreadCount }) {
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch  className='icon'/>
        </div>
        <div style={{display:"flex"}}>
            <div style={{cursor:"pointer"}} onClick={handleNotificationClick}><BsFillBellFill className='icon'/>
             {unreadCount > 0 && (
                    <span 
                      style={{
                         
                          backgroundColor: 'red',
                          color: 'white',
                          borderRadius: '50%',
                          padding: '5px',
                          fontSize: '12px',
                      }}
                    >
                        {unreadCount}
                    </span>
                )}</div>
           <div> <BsFillEnvelopeFill className='icon'/></div>
            <div> <BsPersonCircle className='icon'/></div>
        </div>
    </header>
  )
}

export default Header