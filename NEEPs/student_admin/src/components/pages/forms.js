import React from "react";
import Sidebar from "../sidebar";
import Header from "../header";
import { useHistory } from "react-router-dom";
export default function Forms() {
  const history = useHistory();
  const [unreadCount, setUnreadCount] = React.useState(0); // State for unread notifications
  const [openSidebarToggle, setOpenSidebarToggle] = React.useState(false);
  const [csrfToken, setCsrfToken] = React.useState("");
  const [courses, setCourses] = React.useState([]);
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
  console.log(Prices);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  //student form

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
  const [formData, setFormData] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
    address: "",
    phone_number: "",
    course: "", // Assuming this will be an ID of a course
    bank_receipt: null,
    photo: null,
  });

  React.useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        const response = await fetch("/get_csrf_token/");
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };
    fetchCSRFToken();
  }, []);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObject = new FormData();
    for (const key in formData) {
      formDataObject.append(key, formData[key]);
    }

    try {
      const response = await fetch("api/students", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken,
        },
        body: formDataObject,
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Handle the response as needed
      const data = await response.json();
      window.location.href = "/students";
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };
  //----------------------------------------------------------
  const [formData1, setFormData1] = React.useState({
    name: "",
    description: "",
    duration: "",
    price: "", // Assuming this will be an ID of a price
    photo: null,
    day_or_night: "",
  });

  const handleChange1 = (e) => {
    setFormData1({ ...formData1, [e.target.name]: e.target.value });
  };
  const handleImageChange1 = (e) => {
    setFormData1({
      ...formData1,
      photo: e.target.files[0],
    });
  };
  const handleSubmit1 = async (e) => {
    e.preventDefault();

    const formDataObject = new FormData();
    for (const key in formData1) {
      formDataObject.append(key, formData1[key]);
    }

    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken,
        },
        body: formDataObject,
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      window.location.href = "/courses";
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  //-----------------------------------------------------------
  const [formData2, setFormData2] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange2 = (e) => {
    setFormData2({ ...formData2, [e.target.name]: e.target.value });
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contactMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData2),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      window.location.href = "/contacts";
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  //--------------------------------------------------------------------------------
  const [formData3, setFormData3] = React.useState({
    amount: "",
    description: "",
    valid_from: "",
    valid_until: "",
  });

  const handleChange3 = (e) => {
    setFormData3({
      ...formData3,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit3 = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/price", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData3),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      window.location.href = "/courses";
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  //------------------------------------------------------------

  return (
    <div className="grid-container">
       <Header OpenSidebar={OpenSidebar} handleNotificationClick={handleNotificationClick}  unreadCount={unreadCount}/>
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className="main-container">
        <div className="addhouse">
          <div className="addhouse-form">
            <h1>Add Student</h1>
            <form onSubmit={handleSubmit}>
              <label>
                First Name:
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Last Name:
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Date of Birth:
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Address:
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                ></textarea>
              </label>
              <br />
              <label>
                Phone Number:
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                />
              </label>
              <br />
              <div>
                <select
                  name="course"
                  id="course"
                  value={formData.course}
                  onChange={handleChange}
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <label>
                Bank Receipt:
                <input
                  type="file"
                  name="bank_receipt"
                  onChange={handleImageChange}
                />
              </label>
              <br />
              <label>
                Photo:
                <input type="file" name="photo" onChange={handleImageChange} />
              </label>
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
        <div className="addhouse">
          <div className="addhouse-form">
            <h1>Add Course</h1>
            <form onSubmit={handleSubmit1}>
              <label>
                Course Name:
                <input
                  type="text"
                  name="name"
                  value={formData1.name}
                  onChange={handleChange1}
                />
              </label>
              <br />
              <label>
                Description:
                <textarea
                  name="description"
                  value={formData1.description}
                  onChange={handleChange1}
                ></textarea>
              </label>
              <br />
              <label>
                Duration (weeks):
                <input
                  type="number"
                  name="duration"
                  value={formData1.duration}
                  onChange={handleChange1}
                />
              </label>
              <br />
              <label>
                Price:
                <select
                  name="price"
                  value={formData1.price}
                  onChange={handleChange1}
                >
                  <option value="">Select a Price</option>
                  {Prices.map((price) => (
                    <option key={price.id} value={price.id}>
                      {price.amount}
                    </option>
                  ))}
                </select>
              </label>
              <br />
              <label>
                Course Photo:
                <input type="file" name="photo" onChange={handleImageChange1} />
              </label>
              <br />
              <label>
                Day or Night:
                <select
                  name="day_or_night"
                  value={formData1.day_or_night}
                  onChange={handleChange1}
                >
                  <option value="">Select</option>
                  <option value="Day">Day</option>
                  <option value="Night">Night</option>
                </select>
              </label>
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
        <div className="addhouse">
          <div className="addhouse-form">
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit2}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData2.name}
                  onChange={handleChange2}
                />
              </label>
              <br />
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData2.email}
                  onChange={handleChange2}
                />
              </label>
              <br />
              <label>
                Subject:
                <input
                  type="text"
                  name="subject"
                  value={formData2.subject}
                  onChange={handleChange2}
                />
              </label>
              <br />
              <label>
                Message:
                <textarea
                  name="message"
                  value={formData2.message}
                  onChange={handleChange2}
                ></textarea>
              </label>
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
        <div className="addprice">
          <div className="addprice-form">
            <h1>Add Price</h1>
            <form onSubmit={handleSubmit3}>
              <label>
                Amount:
                <input
                  type="number"
                  name="amount"
                  value={formData3.amount}
                  onChange={handleChange3}
                  step="0.01"
                  required
                />
              </label>
              <br />
              <label>
                Description (Optional):
                <input
                  type="text"
                  name="description"
                  value={formData3.description}
                  onChange={handleChange3}
                />
              </label>
              <br />
              <label>
                Valid From:
                <input
                  type="date"
                  name="valid_from"
                  value={formData3.valid_from}
                  onChange={handleChange3}
                  required
                />
              </label>
              <br />
              <label>
                Valid Until (Optional):
                <input
                  type="date"
                  name="valid_until"
                  value={formData3.valid_until}
                  onChange={handleChange3}
                />
              </label>
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
