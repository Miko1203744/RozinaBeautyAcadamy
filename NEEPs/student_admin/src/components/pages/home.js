import React from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
import Sidebar from '../sidebar'
import Header from '../header';
import { useHistory } from 'react-router-dom';
function Home() {
  const history = useHistory();
  const [unreadCount, setUnreadCount] = React.useState(0); // State for unread notifications
  const[TotalStudent,setTotalStudent]=React.useState('')
  const[TotalCourse,setTotalCourse]=React.useState('')
  const [openSidebarToggle, setOpenSidebarToggle] = React.useState(false)

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

      
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }


React.useEffect(()=>{
fetch('api/TotalStudent')
.then(response=>response.json())
.then(data=>{
 setTotalStudent(data.totalstudent)
 console.log(data)
})

},[])



React.useEffect(()=>{
  fetch('api/TotalCourse')
  .then(response=>response.json())
  .then(data=>{
   setTotalCourse(data.totalcourse)
   console.log(data)
  })
  
  },[])



    



    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
  
      // Functional component Ap
        
        return (
          <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} handleNotificationClick={handleNotificationClick}  unreadCount={unreadCount} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
            <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>total_students</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>{TotalStudent}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>total_course</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>{TotalCourse}</h1>
            </div>
            {/*<div className='card'>
                <div className='card-inner'>
                    <h3>landlords</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
        <h1>{TotalLandlord}</h1>
            </div>*/}
        </div>

        <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
          </div>
        )
  
}

export default Home