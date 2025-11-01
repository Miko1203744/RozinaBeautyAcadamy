import React from "react";
import { useParams } from 'react-router-dom';

export default function UpdateContact(){
    const { contact_id } = useParams();
    const [csrfToken, setCsrfToken] = React.useState("");
    const [formData2, setFormData2] = React.useState({
  name: '',
  email: '',
  subject: '',
  message: '',
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

const handleChange2 = (e) => {
  setFormData2({ ...formData2, [e.target.name]: e.target.value });
};

const handleSubmit2 = async (e) => {
  e.preventDefault();

  try {
      const response = await fetch(`api/update_contact/${contact_id}`, {
          method: 'PUT',
          headers: {
              'X-CSRFToken': csrfToken,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData2),
      });

      if (!response.ok) {
          throw new Error('Failed to submit form');
      }

      window.location.href = '/contacts';
  } catch (error) {
      console.error('Error submitting form:', error.message);
  }
};
  
    return(
<div className="addhouse">
            <div className="addhouse-form">
                <h1>Contact Us</h1>
                <form onSubmit={handleSubmit2}>
                    <label>
                        Name:
                        <input type="text" name="name" value={formData2.name} onChange={handleChange2} />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input type="email" name="email" value={formData2.email} onChange={handleChange2} />
                    </label>
                    <br />
                    <label>
                        Subject:
                        <input type="text" name="subject" value={formData2.subject} onChange={handleChange2} />
                    </label>
                    <br />
                    <label>
                        Message:
                        <textarea name="message" value={formData2.message} onChange={handleChange2}></textarea>
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>

    )
}