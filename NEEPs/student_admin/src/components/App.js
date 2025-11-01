import React from "react";
import { render } from "react-dom";
import "./app.css";
import Home from "./pages/home";
import Students from "./pages/students";
import Login from "./pages/login";
import Contact from "./pages/contact";
import Course from "./pages/course";
import Notification from "./pages/Notification";
import UpdateStudent from "./pages/update_student";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Forms from "./pages/forms";
import UpdateCourse from "./pages/update_course";
import UpdatePrice from "./pages/update_price";
import UpdateContact from "./pages/update_contact";



// Functional component App
function App() {
  return (
    <Router>
    <Switch>
      <Route path="/admin_s" exact component={Home}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/students" component={Students}/>
      <Route path="/notification" component={Notification}/>
      <Route path="/contacts" component={Contact}/>
      <Route path="/courses" component={Course}/>
      <Route path="/update_student/:student_id" component={UpdateStudent}/>
      <Route path="/update_course/:course_id" component={UpdateCourse}/>
      <Route path="/update_price/:price_id" component={UpdatePrice}/>
      <Route path="/update_contact/:contact_id" component={UpdateContact}/>
      <Route path="/forms" component={Forms}/>
     
      </Switch>
      </Router>

  );
}

// Render the functional component App into the HTML element with the ID 'app'
const appDivs = document.getElementById("apps");
render(<App />, appDivs);
