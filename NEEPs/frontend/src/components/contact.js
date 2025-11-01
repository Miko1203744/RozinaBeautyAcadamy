import React from "react"
import "../contact.css"
import NavBar from "./navbar"
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Footer from "./footer";
export default function Contact()
{
  mapboxgl.accessToken = 'pk.eyJ1IjoibWlreWFzIiwiYSI6ImNsam83eGJiYzA4N2kzanM5bWp5MGd4dDUifQ.VcbFEX-szkvBq0VQ7RlCCA';

  React.useEffect(() => {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [38.739824, 8.964840], // Center of the bounding box
        zoom: 10
    });

    const boundingBox = {
        minLongitude: 38.639405,
        minLatitude: 8.833485,
        maxLongitude: 38.906244,
        maxLatitude: 9.098195
    };

    // Add the Mapbox search functionality
    const searchString = "megenaga"; // Can replace with state or prop
    const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchString)}.json?bbox=${boundingBox.minLongitude},${boundingBox.minLatitude},${boundingBox.maxLongitude},${boundingBox.maxLatitude}&access_token=${mapboxgl.accessToken}`;

    fetch(mapboxUrl)
        .then(response => response.json())
        .then(data => {
            if (data.features && data.features.length > 0) {
                const coordinates = data.features[0].center;
                const [longitude, latitude] = coordinates;

                map.flyTo({
                    center: [longitude, latitude],
                    zoom: 14
                });

                new mapboxgl.Marker()
                    .setLngLat([longitude, latitude])
                    .addTo(map);
            } else {
                console.log('City not found');
            }
        })
        .catch(error => {
            console.error('Error making request to Mapbox Geocoding API:', error);
        });

    return () => map.remove();
}, []);
  

   const [csrfToken, setCsrfToken] = React.useState("");
   const [formData, setFormData] = React.useState({
     name: "",
     email: "",
     subject: "",
     message: "",
   });
   
   const [responseMessage, setResponseMessage] = React.useState("");



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


    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
  
      fetch("/api/contactMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken, // include CSRF token
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          setResponseMessage(data.message || "Message sent successfully!");
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
        })
        .catch((error) => {
          setResponseMessage("An error occurred. Please try again.");
          console.error("Error:", error);
        });
    };


  return ( 
 <>
 <NavBar/>
 <div className="contact-cont">
    <div className="contact-box1">
        <div><i class="fa-solid fa-location-dot"></i>
         <h4 style={{color:"white"}}>Our Main Office</h4>
         <p style={{color:"white"}} >megenaga selam tower 8 floor</p>
         </div>
        <div><i class="fa-solid fa-phone"></i>
         <h4 style={{color:"white"}}>PHONE NUMBER</h4>
         <p style={{color:"white"}} >+251909271567</p></div>
        <div><i class="fa-solid fa-fax"></i>
         <h4 style={{color:"white"}}>FAX</h4>
         <p style={{color:"white"}} >1000</p></div>
        <div><i class="fa-regular fa-envelope"></i>
         <h4 style={{color:"white"}}>Email</h4>
         <p style={{color:"white"}} >mikwossen@gmail.com</p></div>
    </div>
    <div className="contact-box2">
      <form onSubmit={handleSubmit}>
        <div>
     <h1 style={{textAlign:"center"}}>Contact us</h1>
     <input type="text"
              id="name"
              name="name"
              placeholder="enter your name"
              value={formData.name}
              onChange={handleChange}
              required/><br/>
     <input  type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
             placeholder="Enter a valid email address"
             required/>
      <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>       
     <textarea id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="enter your message"
              required/><br/>
     <button style={{position:"relative", top:"50px"}}>submit</button>
    </div>
    </form>
    </div>
 </div>
 <div id="map" style={{height:"400px", width:"100%" ,border:"1px solid black", borderRadius:"10px",marginBottom:"100px"}}></div>
 <Footer/>
 </>
  )
}