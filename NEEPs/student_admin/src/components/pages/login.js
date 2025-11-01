// Login.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);
    const [csrfToken, setCsrfToken] = React.useState("");
    const history = useHistory(); // Initialize useHistory


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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessages([]); // Reset error messages on submit

        try {
            const response = await fetch('/api/login', { // Adjust API URL as necessary
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "X-CSRFToken": csrfToken,
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // Assuming the response includes a redirect URL or similar handling
                if (data.redirect) {
                    history.push(data.redirect); // Redirect after successful login
                }
            } else {
                const errorData = await response.json();
                setErrorMessages([errorData.detail || "Invalid email or password."]);
            }
        } catch (error) {
            setErrorMessages(["An error occurred, please try again."]);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {errorMessages.length > 0 && (
                <ul>
                    {errorMessages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Login;