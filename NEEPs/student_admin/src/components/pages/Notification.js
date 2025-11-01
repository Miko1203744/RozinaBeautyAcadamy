import React, { useEffect, useState } from 'react';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null); // State to track the selected student
    const [csrfToken, setCsrfToken] = useState("");

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
    
    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await fetch('/api/notifications/');
            if (!response.ok) {
                throw new Error("Failed to fetch notifications");
            }
            const data = await response.json();
            setNotifications(data);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    const handleAction = async (notificationId, action,student) => {
        try {
            const response = await fetch(`/api/notifications/${notificationId}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Ensure correct content type
                    'X-CSRFToken': csrfToken, // Include CSRF token
                },
                body: JSON.stringify({ action ,
                    student_name: `${student.first_name} ${student.last_name}`,
                    student_email: student.email,}),
            });

            if (!response.ok) {
                throw new Error("Failed to handle notification action");
            }

            const data = await response.json();
            alert(data.message);
            fetchNotifications(); // Refetch notifications to update the list
        } catch (error) {
            console.error("Error handling action:", error);
        }
    };

    const handleViewDetails = (student) => {
        setSelectedStudent(student); // Set the selected student to display details
        console.log(student); 
    };

    const closeDetails = () => {
        setSelectedStudent(null); // Clear the selected student
    };

    return (
        <div>
        <h2>Notifications</h2>
        {notifications.length === 0 ? (
            <p>No new notifications.</p>
        ) : (
            <ul>
                {notifications.map((notification) => (
                    <li key={notification.id}>
                        <p>{notification.message}</p>
                        <p>Student: {notification.student.first_name} {notification.student.last_name}</p>
                        <button onClick={() => handleViewDetails(notification.student)}>View Details</button>
                        <button onClick={() => handleAction(notification.student.id, 'accept',notification.student)}>Accept</button>
                        <button onClick={() => handleAction(notification.student.id, 'reject',notification.student)}>Reject</button>
                    </li>
                ))}
            </ul>
        )}

        {selectedStudent && (
            <div className="modal" style={{ display: 'block', zIndex: 1000 }}>
                <div className="modal-content">
                    <h3>Student Information</h3>
                    <p><strong>Name:</strong> {selectedStudent.first_name} {selectedStudent.last_name}</p>
                        <p><strong>Email:</strong> {selectedStudent.email}</p>
                        <p><strong>Phone:</strong> {selectedStudent.phone_number}</p>
                        <p><strong>Address:</strong> {selectedStudent.address}</p>
                        <p><strong>Course:</strong> {selectedStudent.course}</p>
                        <p><strong>Date of Birth:</strong> {selectedStudent.date_of_birth}</p>
                        <p><strong>Status:</strong> {selectedStudent.status}</p>
                        <p><strong>Enrollment Date:</strong> {selectedStudent.enrollment_date}</p>
                        <p><strong>Bank Receipt:</strong> <a href={selectedStudent.bank_receipt} target="_blank" rel="noopener noreferrer">View Receipt</a></p>
                        <p><strong>Photo:</strong> <a href={selectedStudent.photo} target="_blank" rel="noopener noreferrer">View Photo</a></p>
                    <button onClick={closeDetails}>Close</button>
                </div>
            </div>
        )}
    </div>
    );
};

export default Notifications;
