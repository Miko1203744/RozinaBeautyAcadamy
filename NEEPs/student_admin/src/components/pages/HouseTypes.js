import React from "react";
import Sidebar from "../sidebar";
import Header from "../header";
export default function HouseTypes(){
    const [openSidebarToggle, setOpenSidebarToggle] = React.useState(false)
    const [HouseTypes, setHouseTypes] = React.useState([])   
    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }

   
    
    React.useEffect(() => {
      fetch('/api/HouseType') // Replace with your API endpoint
        .then(response => response.json())
        .then(data => setHouseTypes(data))
        .catch(error => console.log(error));
    }, []);
  console.log(HouseTypes)

    return(
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar}/>
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
            <main>
            <div className="container mt-4"> {/* Add container class */}
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">HouseType Table</h4>
              <table className="table table-bordered"> {/* Add table-bordered class */}
                <thead className="thead-dark"> {/* Add thead-dark class */}
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">type </th>
                    <th scope="col">Icon</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {HouseTypes.map((x, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{x.type}</td>
                        <td>{x.Icon}</td>
                        <td>
                          <a href={`/update_housetype/${x.id}`} className="btn btn-primary mb-2">Edit House</a>
                          <a href={`api/delete_housetype/${x.id}`} className="btn btn-danger mb-2">Delete House</a>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
            </main>
     </div>
    )
}

