import React from "react";
import { useParams } from 'react-router-dom';
export default function UpdateHouseType(){
    const { house_id } = useParams();
    const house_id1 = house_id;
    const [csrfToken, setCsrfToken] = React.useState("");
    const [formData2, setFormData2] = React.useState({
        Type: '',
        Icon: 'null',
    
    })

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
    
    const handleImageChange2 = (e) => {
        setFormData2({
            ...formData2,
            Icon: e.target.files[0],
        });
    };
    
    const handleSubmit2 = (e) => {
        e.preventDefault();
        const value2 = {
          type: formData2.Type,
          icon: formData2.Icon,
        };
        console.log(value2)
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json",
            'X-CSRFToken': csrfToken,
              
         },
          body: JSON.stringify(
           value2
          ),
        };
    
        fetch(`api/update_housetype/${house_id1}/`, requestOptions)
          .then((response) =>{
           if(response.ok){
           return response.json()
           }
           else{
            throw new Error('response was not ok.');
           }
          })
          .then((data) => {
            window.location.href="/HouseTypes"; 
    
          })
          .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
          });
          
    
    }

  return(
    <div className="addhouse">
    <div className="addhouse-form">
    <h1>Add HouseType</h1>
    <form onSubmit={handleSubmit2}>
        <label>
            House type
            <input
                type="text"
                name="Type"
                value={formData2.Type}
                onChange={handleChange2}
            />
        </label>
<br/>
        <label>
            House Icon
            <input
                type="file"
                name="Icon"
                onChange={handleImageChange2}
            />
        </label>
<br/>
        <button type="submit">Submit</button>
    </form>
    </div>
    </div>

  )
}