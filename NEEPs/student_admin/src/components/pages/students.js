import React from "react";
import Header from "../header";
import Sidebar from "../sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from 'react-router-dom';
export default function Students() {
  const history = useHistory();
  const [unreadCount, setUnreadCount] = React.useState(0); // State for unread notifications
  const [openSidebarToggle, setOpenSidebarToggle] = React.useState(false);
  const [Students, setStudents] = React.useState([]);
 
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

      
 
 
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  React.useEffect(() => {
    fetch("/api/student_list") // Make sure this URL matches your Django API URL
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        return response.json();
      })
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} handleNotificationClick={handleNotificationClick}  unreadCount={unreadCount}/>
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
            <main className='main-container'>
        <div className="container mt-4">
          {" "}
          {/* Add container class */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">student Table</h4>
                  <table className="table table-bordered">
                    {" "}
                    {/* Add table-bordered class */}
                    <thead className="">
                      {" "}
                      {/* Add thead-dark class */}
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">first_name</th>
                        <th scope="col">last_name</th>
                        <th scope="col">email</th>
                        <th scope="col">date_of_birth</th>
                        <th scope="col">address</th>
                        <th scope="col">phone_number</th>
                        <th scope="col">enrollment_date</th>
                        </tr>
                        <tr>
                        <th scope="col">course</th>
                        <th scope="col">bank_receipt</th>
                        <th scope="col">photo</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Students.map((x, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{x.first_name}</td>
                            <td>{x.last_name}</td>
                            <td>{x.email}</td>
                            <td>{x.date_of_birth}</td>
                            <td>{x.address}</td>
                            <td>{x.phone_number}</td>
                            <td>{x.enrollment_date}</td>
                            </tr>
                            <tr>
                            <td>{x.course.name}</td>
                            <td>
                              <img
                                src={x.bank_receipt}
                                height="50px"
                                width="50px"
                              />
                            </td>
                            <td>
                              <img src={x.photo} height="50px" width="50px" />
                            </td>
                            <td>
                              <a
                                href={`/update_student/${x.id}`}
                                className="btn btn-primary mb-2"
                              >
                                Edit student
                              </a>
                              <a
                                href={`api/delete_student/${x.id}`}
                                className="btn btn-danger mb-2"
                              >
                                Delete student
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
