import React from "react";
import { useParams } from "react-router-dom";
export default function UpdatePrice() {
const { price_id } = useParams();    
const [csrfToken, setCsrfToken] = React.useState('');
  const [formData3, setFormData3] = React.useState({
  amount: '',
  description: '',
  valid_from: '',
  valid_until: '',
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

const handleChange3 = (e) => {
  setFormData3({
      ...formData3,
      [e.target.name]: e.target.value,
  });
};

const handleSubmit3 = async (e) => {
  e.preventDefault();

  try {
      const response = await fetch(`api/update_price/${price_id}`, {
          method: 'PUT',
          headers: {
              'X-CSRFToken': csrfToken,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData3),
      });

      if (!response.ok) {
          throw new Error('Failed to submit form');
      }

      window.location.href = '/courses';
  } catch (error) {
      console.error('Error submitting form:', error.message);
  }
};
  return (
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
  );
}


