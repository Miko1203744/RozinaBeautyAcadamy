import React from "react";
import { useParams } from "react-router-dom";

export default function UpdateStudent(){
const { student_id } = useParams();    
const [csrfToken, setCsrfToken] = React.useState('');
const [courses, setCourses] = React.useState([]);
const [formData, setFormData] = React.useState({
  first_name: '',
  last_name: '',
  email: '',
  date_of_birth: '',
  address: '',
  phone_number: '',
  course: '',  // Assuming this will be an ID of a course
  bank_receipt: null,
  photo: null,
});
   

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
    
    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

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
            const response = await fetch(`api/update_student/${student_id}`, {
                method: 'PUT',
                headers: {
                    'X-CSRFToken': csrfToken,
                      },
                body: formDataObject,
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            // Handle the response as needed
            const data= await response.json()
            window.location.href = '/students'
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    };

    return(
            <div className="addhouse">
                    <div className="addhouse-form">
                        <h1>Add Student</h1>
                        <form onSubmit={handleSubmit}>
                            <label>
                                First Name:
                                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
                            </label>
                            <br />
                            <label>
                                Last Name:
                                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
                            </label>
                            <br />
                            <label>
                                Email:
                                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                            </label>
                            <br />
                            <label>
                                Date of Birth:
                                <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} />
                            </label>
                            <br />
                            <label>
                                Address:
                                <textarea name="address" value={formData.address} onChange={handleChange}></textarea>
                            </label>
                            <br />
                            <label>
                                Phone Number:
                                <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
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
                                <input type="file" name="bank_receipt" onChange={handleImageChange} />
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
                )
}