import React from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import {Link,useHistory} from 'react-router-dom'

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const [csrfToken, setCsrfToken] = React.useState('');
  const history=useHistory();
  React.useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        const response = await fetch('/get_csrf_token/');
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };
    fetchCSRFToken();
  }, []);


  const handleLogout = () => {
    fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken, //Include the CSRF toke
      },
    })
      .then((response) => {
        if (response.ok) {
          history.push("/login");
          // Handle successful logout (e.g., clear local storage, redirect, etc.)
        } else {
          // Handle logout failure
          console.log("ferror");
        }
      })
      .catch((error) => {
        console.log("xerror");
      });
  };
  
  

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <img src="media/img/roza.png" height="50px" width="50px" />Roza beauty acadamy
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/admin_s">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/students">
            <BsFillArchiveFill className="icon" /> students
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/Agents">
            <BsFillGrid3X3GapFill className="icon" /> stuffs
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/courses">
            <BsPeopleFill className="icon" /> courses
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/contacts">
            <BsListCheck className="icon" /> comments
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/forms">
            <BsMenuButtonWideFill className="icon" /> forms
          </Link>
        </li>
        <li className="sidebar-list-item">
          <button onClick={handleLogout}>
            <BsFillGearFill className="icon" /> Logout
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
