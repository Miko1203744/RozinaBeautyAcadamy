import React, { useState } from "react";
import NavBar from "./navbar";
import Footer from "./footer";
import { useParams,useNavigate } from 'react-router-dom';
import "../register.css";
export default function RegisterForm() {
  const [color, setColor] = React.useState("green");
  const [is_Visible, setIs_Visible] = React.useState(true);
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);

  // Check for small screen on initial load and window resize
  React.useEffect(() => {
    const checkScreenSize = () => {
      const isSmall = window.innerWidth <= 768;
      setIsSmallScreen(isSmall);
      if (!isSmall) {
        setIs_Visible(true); // Always visible on larger screens
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Hide navigation bar after 3 seconds on small screens
  React.useEffect(() => {
    if (isSmallScreen) {
      const timer = setTimeout(() => setIs_Visible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isSmallScreen]);
  const [csrfToken, setCsrfToken] = useState("");
  const navigate = useNavigate(); // Initialize the navigate hook
  const { course_id } = useParams();
  console.log(course_id);

  React.useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        const response = await fetch("/get_csrf_token/");
        const data = await response.json();
        setCsrfToken(data.csrfToken);
        localStorage.setItem("csrftoken", data.csrfToken);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };
    fetchCSRFToken();
  }, []);


  const [courses, setCourses] = useState([]);
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

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
    address: "",
    phone_number: "",
    course: course_id,
    student_photo: null,
    bank_receipt: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create FormData object to handle file uploads
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    fetch("/api/students", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken, // include CSRF token
      },
      body: formDataToSend,
    })
      .then((response) =>{
      if (response.ok) {
        console.log("Success:", response);
        navigate('/studentcreate'); // Redirect to a success page
      } else {
        return response.json().then((data) => {
          console.error("Error:", data);
        });
      }
    })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
    <nav className={`nav1 ${is_Visible ? "visible" : "hidden"}`}  style={{
          backgroundColor: color }}>
          <div className="contact">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                height="20px"
                width="20px"
              >
                <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
              </svg>
              +251993801606, +251942627927
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                height="20px"
                width="20px"
              >
                <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
              </svg>
              megenaga selam tower 8th floor
            </div>
          </div>
          <div className="social">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                height="20"
                width="20"
              >
                <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
              </svg>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                height="20px"
                width="20px"
              >
                <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
              </svg>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                height="20px"
                width="20px"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                height="20px"
                width="20px"
              >
                <path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z" />
              </svg>
            </li>
          </div>
        </nav>
        <hr />
      <NavBar />
      <div className="reg-cont">
        
        <div className="reg-box1">
          <form onSubmit={handleSubmit}>
          <h1>billing detail</h1>
          <hr/>
            <div className="form-group">
              <label for="fname">first_name(ስም)</label>
              <input
                type="text"
                className="fo"
                id="fname"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label for="lname">last_name(የአባት ስም)</label>
              <input
                type="text"
                id="lname"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label for="email">email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label for="dbo">date_of_birth</label>
              <input
                type="date"
                name="date_of_birth"
                id="dbo"
                value={formData.date_of_birth}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label for="address">address</label>
              <textarea
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label for="phone_number">phone_number</label>
              <input
                type="text"
                name="phone_number"
                id="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </div>
           { /*<div>
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
            </div>*/}
            <div>
              <label for="student_photo">student_photo</label>
              <input
                type="file"
                id="student_photo"
                name="student_photo"
                onChange={handleChange}
              />
            </div>
            <div>
              <label for="bank_receipt">bank_receipt</label>
              <input
                type="file"
                id="bank_receipt"
                name="bank_receipt"
                onChange={handleChange}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="reg-box2">
         <div className="box2-main">
            <h1>Your order</h1>
            <div>
              <h3 style={{ float: "right" }}>subtotal</h3>
                <h3>product</h3>
                <hr/>
                <p style={{ float: "right" }}>19000.00birr</p>
                <p>Nails x 1</p>
                <hr/>
                <p style={{ float: "right" }}>19000.00birr</p>
                <p>subtotal</p>
                <hr/>
                <p style={{ float: "right" }}>19000.00birr</p>
                <p>total</p>
                <hr/>
                <p>Direct bank transfer</p>
                <div className="reg-cont1">
                  <div><p>roza beauty acadamy</p>
                  <p>1000273441167</p>
                  <p>cbe</p>
                  </div>
                  {/*<div><p>roza beauty acadamy</p>
                  <p>1000</p>
                  <p>awash bank</p>
                  </div>
                  <div><p>roza beauty acadamy</p>
                  <p>0001</p>
                  <p>abysina bank</p>
                  </div>
                  <div><p>roza beauty acadamy</p>
                  <p>0001</p>
                  <p>cbe</p>
          </div>*/}
                </div>
                <button onClick={{}}>PLACE ORDER</button>
                </div>
            </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
