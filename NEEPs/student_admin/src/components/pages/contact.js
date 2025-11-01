import React from "react";
import Header from "../header";
import Sidebar from "../sidebar";
import { useHistory } from "react-router-dom";
export default function Contact() {
  const history = useHistory();
  const [unreadCount, setUnreadCount] = React.useState(0); // State for unread notifications
  const [openSidebarToggle, setOpenSidebarToggle] = React.useState(false);
  const [Contact, setContact] = React.useState([]);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  React.useEffect(() => {
   const fetchNotifications = async () => {
        try {
            const response = await fetch('/api/notifications/'); // Adjust to your notification API endpoint

            if (!response.ok) {
                throw new Error("Failed to fetch notifications");
            }

            const data = await response.json();
            // Count unread notifications based on the 'is_read' property
            const unreadNotifications = data.filter(notification => !notification.is_read).length;
            setUnreadCount(unreadNotifications);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    fetchNotifications(); // Fetch notifications on component mount
}, []); // Empty dependency array, so it runs once

const handleNotificationClick = () => {
    history.push("/notification"); // Redirect to notifications page
};


  React.useEffect(() => {
    fetch("/api/contact_list") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => setContact(data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} handleNotificationClick={handleNotificationClick}  unreadCount={unreadCount}/>
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className="main-container">
        <div className="container mt-4">
          {" "}
          {/* Add container class */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">contact Table</h4>
                  <table className="table table-bordered">
                    {" "}
                    {/* Add table-bordered class */}
                    <thead className="thead-dark">
                      {" "}
                      {/* Add thead-dark class */}
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">name </th>
                        <th scope="col">email</th>
                        <th scope="col">subject</th>
                        <th scope="col">message</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Contact.map((x, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{x.name}</td>
                            <td>{x.email}</td>
                            <td>{x.subject}</td>
                            <td>{x.message}</td>
                            <td>
                              <a
                                href={`/update_contact/${x.id}`}
                                className="btn btn-primary mb-2"
                              >
                                Edit contact
                              </a>
                              <a
                                href={`api/delete_contact/${x.id}`}
                                className="btn btn-danger mb-2"
                              >
                                Delete contact
                              </a>
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
