import React from "react";
import Header from "../header";
import Sidebar from "../sidebar";
import { useHistory } from "react-router-dom";
export default function Course() {
  const history = useHistory();
  const [unreadCount, setUnreadCount] = React.useState(0); // State for unread notifications
  const [openSidebarToggle, setOpenSidebarToggle] = React.useState(false);
  const [Courses, setCourses] = React.useState([]);
  const [Prices, setPrices] = React.useState([]);
  
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
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses"); // Adjust this endpoint to your courses endpoint
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);
  console.log(Courses);

  React.useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch("/api/price"); // Adjust this endpoint to your courses endpoint
        const data = await response.json();
        setPrices(data);
      } catch (error) {
        console.error("Error fetching price:", error);
      }
    };
    fetchPrice();
  }, []);

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} handleNotificationClick={handleNotificationClick}  unreadCount={unreadCount}/>
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
        <div>
          {" "}
          {/* Add container class */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">course Table</h4>
                  <table className="table table-bordered">
                    {" "}
                    {/* Add table-bordered class */}
                    <thead className="thead-dark">
                      {" "}
                      {/* Add thead-dark class */}
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">name</th>
                        <th scope="col">description</th>
                        <th scope="col">duration</th>
                        <th scope="col">price</th>
                        <th scope="col">photo</th>
                        <th scope="col">day_or_night</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Courses.map((x, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{x.name}</td>
                            <td>{x.description}</td>
                            <td>{x.duration}</td>
                            <td>{x.price.amount}</td>
                            <td>
                              <img src={x.photo} height="50px" width="50px" />
                            </td>
                            <td>{x.day_or_night}</td>
                            <td>
                              <a
                                href={`/update_course/${x.id}`}
                                className="btn btn-primary mb-2"
                              >
                                Edit course
                              </a>
                              <a
                                href={`api/delete_course/${x.id}`}
                                className="btn btn-danger mb-2"
                              >
                                Delete House
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
          <div className="row mt-5">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">price Table</h4>
                  <table className="table table-bordered">
                    {" "}
                    {/* Add table-bordered class */}
                    <thead className="thead-dark">
                      {" "}
                      {/* Add thead-dark class */}
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">amount</th>
                        <th scope="col">description(optional)</th>
                        <th scope="col">valid_from</th>
                        <th scope="col">valid_until</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Prices.map((x, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{x.amount}</td>
                            <td>{x.description}</td>
                            <td>{x.valid_from}</td>
                            <td>{x.valid_until}</td>
                            <td>
                              <a
                                href={`/update_price/${x.id}`}
                                className="btn btn-primary mb-2"
                              >
                                Edit price
                              </a>
                              <a
                                href={`api/delete_price/${x.id}`}
                                className="btn btn-danger mb-2"
                              >
                                Delete price
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
