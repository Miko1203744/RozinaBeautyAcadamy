import React from "react";
import "./App.css";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import Course from "./components/course";
import RegisterForm from "./components/register";
import Price from "./components/Price";
import Contact from "./components/contact";
import Service_list from "./components/service_list";
import StudentCreate from "./components/StudentCreate";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/about" Component={About} />
          <Route path="/course" Component={Course} />
          <Route path="/price" Component={Price} />
          <Route path="/studentcreate" Component={StudentCreate} />
          <Route path="/register/:course_id" Component={RegisterForm} />
          <Route
            path="/makeup"
            element={
              <Course
                title="makeup"
                content="The makeup artist education at JBA Makeup & beauty Academy is a practical education with focus on technical training. We balance 30% theory with 70% practical studies as we believe that extensive practice produces the best artists.

          At the beginning of each new theme, the teacher will focus on the theory behind and demonstrate on a model. The theoretic part includes an extensive compendium and oral lectures where focus is on styles, techniques, products, product ingredients and much more.
          
          After the theoretic introduction to a new theme the students work in pairs and groups to practice the techniques. The teachers follows, corrects and supervises the students’ work on both models and face charts. As the students from JBA beauty Academy are widely recognized for their technical and artistic level, they are often are often invited to participate in real-life work on photo shoots, etc. both before and after the education period."
                imageUrl="../../static/images/img6.jpg"
              />
            }
          />
          <Route
            path="/nails"
            element={
              <Course
                title="nails"
                content="Beautiful nails are a must and so is the demand for skilled, reliable, well-educated nail techs. You will learn the nail shop business and one day have the knowledge to manage a nail shop or even own your own business. Master the art fun of nail technology as we teach the techniques of ."
                imageUrl="../../static/images/img7.jpg"
                list={[
                  "menicures",
                  "pedicures",
                  "sculpting",
                  "Nail Art",
                  "Extensions",
                  "gels",
                  "Wraps",
                ]}
              />
            }
          />
          <Route
            path="/eyelash"
            element={
              <Course
                title="eyelash"
                content="Beginner – 7-Day Classic Lash Extension Certification Training

          Eyelash Extension Training: Build a foundation for a successful lash extensions career & get listed on the Lash Stylist Directory
          
          Learn the fundamentals, core techniques, and business building strategies necessary to become a successful Extreme Lashes Lash Stylist. Get trained and certified in the art and science of Classic/Single-Layer eyelash extensions application by enrolling in our hands-on 7-day Classic Lash Extension Certification Training."
                imageUrl="../../static/images/img8.jpg"
              />
            }
          />
          <Route
            path="/hina"
            element={
              <Course
                title="EYEBROW HENNA"
                content="Brow Henna is applied with disposable angled brushes or Brow Code’s Brush 122 angled brush. Brow Henna is sleekly applied.

          WHAT YOU WILL LEARN"
                imageUrl="../../static/images/beauty4.jpg"
                list={[
                  "How to mix the brow henna",
                  "tips and tricks",
                  "How to achieve a smooth application",
                ]}
              />
            }
          />
          <Route path="/contact" exact Component={Contact} />

          <Route
            path="/makeup_service"
            element={
              <Service_list
                image="../../static/images/beauty.jpg"
                text="make up infomation"
                link="/makeup"
              />
            }
          />
          <Route
            path="/nails_service"
            element={
              <Service_list
                image="../../static/images/nail.jpg"
                text="nail information"
                link="/nails"
              />
            }
          />
          <Route
            path="/hina_service"
            element={
              <Service_list
                image="../../static/images/hina.jpg"
                text="hina information"
                link="/hina"
              />
            }
          />
          <Route
            path="/eyelash_service"
            element={
              <Service_list
                image="../../static/images/eyelash.jpg"
                text="eyelash information"
                link="/eyelash"
              />
            }
          />
          <Route
            path="/hair_service"
            element={
              <Service_list
                image="../../static/images/hair.jpg"
                text="hair information"
                link="/makeup"
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}
const appDiv = document.getElementById("app");
ReactDOM.render(React.createElement(App, null), appDiv);
