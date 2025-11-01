import React from "react";
import { useParams } from "react-router-dom";

export default function UpdateCourse(){
const { course_id } = useParams();    
const [csrfToken, setCsrfToken] = React.useState('');
const [Prices, setPrices] = React.useState([]);
const [formData1, setFormData1] = React.useState({
    name: '',
    description: '',
    duration: '',
    price: '', // Assuming this will be an ID of a price
    photo: null,
    day_or_night: '',
  });
  

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
        const response = await fetch(`api/update_course/${course_id}`, {
            method: 'PUT',
            headers: {
                'X-CSRFToken': csrfToken,
            },
            body: formDataObject,
        });
  
        if (!response.ok) {
            throw new Error('Failed to submit form');
        }
  
        window.location.href = '/courses';
    } catch (error) {
        console.error('Error submitting form:', error.message);
    }
  };
  

    return(
             <div className="addhouse">
            <div className="addhouse-form">
                <h1>Add Course</h1>
                <form onSubmit={handleSubmit1}>
                    <label>
                        Course Name:
                        <input type="text" name="name" value={formData1.name} onChange={handleChange1} />
                    </label>
                    <br />
                    <label>
                        Description:
                        <textarea name="description" value={formData1.description} onChange={handleChange1}></textarea>
                    </label>
                    <br />
                    <label>
                        Duration (weeks):
                        <input type="number" name="duration" value={formData1.duration} onChange={handleChange1} />
                    </label>
                    <br />

                    <label>
                        Price:
                        <select name="price" value={formData1.price} onChange={handleChange1}>
                            <option value="">Select a Price</option>
                            {Prices.map(price => (
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
                  <br/>
                    <label>
                        Day or Night:
                        <select name="day_or_night" value={formData1.day_or_night} onChange={handleChange1}>
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
                )
}