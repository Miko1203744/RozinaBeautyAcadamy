import React from "react";
import NavBar from "./navbar";
import Footer from "./footer";
import { useNavigate } from 'react-router-dom';
export default function Price() {
  const [DayCourses, setDayCourses] = React.useState([]);
  const [NightCourses, setNightCourses] = React.useState([]);
  const navigate = useNavigate();
    const handleRegisterClick = (course_id) => {
      navigate(`/register/${course_id}`);
    };

    React.useEffect(() => {
      const fetchCourses = async () => {
        try {
          const response = await fetch("/api/courses/day"); // Adjust this endpoint to your courses endpoint
          const data = await response.json();
          setDayCourses(data);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };
      fetchCourses();
    }, []);
    console.log(DayCourses);
    
    React.useEffect(() => {
      const fetchCourses = async () => {
        try {
          const response = await fetch("/api/courses/night"); // Adjust this endpoint to your courses endpoint
          const data = await response.json();
          setNightCourses(data);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };
      fetchCourses();
    }, []);


  return (
    <>
      <NavBar />

      <div className="section1">
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Regular Class
        </h1>
        <div className="sec1-grids">
        {DayCourses.map(course => (<div  className="gridA" key={course.id}>
            <img
              src={course.photo}
              width="100%"
              height="80%"
            ></img>
            <h3>{course.name}</h3>
            <h4>{course.price.amount}</h4>
            <button onClick={() => handleRegisterClick(course.id)}>register</button>
          </div>
          ))}
        </div>
      </div>
      <div className="section2">
        <h1 style={{ textAlign: "center" }}>night class</h1>
        <div className="sec1-grids">
        {NightCourses.map(course => (<div className="gridB"key={course.id}>
            <img
              src={course.photo}
              width="100%"
              height="80%"
            ></img>
            <h3>{course.name}</h3>
            <h4>{course.price.amount}</h4>
            <button onClick={() => handleRegisterClick(course.id)}>register</button>
          </div>
          ))}
         
        </div>
      </div>
      <Footer />
    </>
  );
}
