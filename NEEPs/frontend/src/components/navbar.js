import React from 'react'
import "../App.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';
export default function NavBar(){

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
    const [click,setclick]=React.useState(false);
    const [button,setButton]=React.useState(true);
  
    const handleClick=()=>setclick(!click);
    React.useEffect(() => {
        const minDuration = 2000; // 2 seconds
        const loadTime = new Date().getTime();
      
        
    
        // Function to hide the preloader
        const hidePreloader = () => {
          const preloaderElement = document.getElementById('preloader');
          const ctnPreloaderElement = document.getElementById('ctn-preloader');
          
          if (ctnPreloaderElement && preloaderElement) {
            ctnPreloaderElement.style.display = 'none';
            setTimeout(() => {
              preloaderElement.style.display = 'none';
              document.body.style.overflow = 'visible';
            }, 350);
          }
        };
    
        const currentTime = new Date().getTime();
        const remainingTime = minDuration - (currentTime - loadTime);
        const adjustedTime = remainingTime > 0 ? remainingTime : 0;
    
        const timer = setTimeout(hidePreloader, adjustedTime);
    
        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timer);
      }, []);
    
    
  
      const showButton =()=>{
          if(window.innerWidth <=960){
              setButton(false);
          }else{
              setButton(true);
          }
      };
       React.useEffect(()=>{
          showButton();
       },[]);
      window.addEventListener('resize',showButton);
    return(
        <>
        <div id="preloader">
<div id="ctn-preloader">
    <div class="spinner"></div>
    <div class="preloader-text">Rozina beauty Acadamy </div>
</div>
</div>
        <nav className="nav2">
        <div>
          <img src="../../static/images/roza.png"
            height="100px"
            width="100px"></img>
        </div>
        <div className='menu-icon' onClick={handleClick}>
                  <i className={click ?'fas fa-times':'fas fa-bars'}></i>
              </div>
        <div className={click ? 'nav-list active':'nav-list'}>
          <NavLink  className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'} to="/">Home</NavLink>

          <NavLink  className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'} to="/about">about</NavLink>

          <li style={{textDecoration:"none"}} className="dropdown">
          <NavLink style={{color:"yellowgreen",fontWeight:"bold", fontSize:"25px",textDecoration:"none"}}to="#options" onClick={toggleDropdown} className="dropdown-toggle">
            Courses <FontAwesomeIcon icon={faChevronDown} className="icon" />
          </NavLink>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li style={{listStyle:"none"}}><NavLink className={({ isActive }) => isActive ? 'dropdown-item nav-link-active' : 'dropdown-item'} to="/makeup" >makeup</NavLink></li>
              <li style={{listStyle:"none"}} ><NavLink  className={({ isActive }) => isActive ? 'dropdown-item nav-link-active' : 'dropdown-item'} to="/nails" >nails</NavLink></li>
              <li style={{listStyle:"none"}}><NavLink   className={({ isActive }) => isActive ? 'dropdown-item nav-link-active' : 'dropdown-item'} to="/eyelash" >eyelash</NavLink></li>
              <li style={{listStyle:"none"}}><NavLink  className={({ isActive }) => isActive ? 'dropdown-item nav-link-active' : 'dropdown-item'}  to="/hina" >hina</NavLink></li>
            </ul>
          )}
        </li>
          <NavLink className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'} to="/price">price</NavLink>

          <NavLink className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'} to="/contact">contact</NavLink>
        </div>
      </nav>
      </>
    );

}