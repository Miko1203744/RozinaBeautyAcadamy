import React from "react";
import NavBar from "./navbar";
import "../course.css";
import Footer from "./footer";
export default function Course({ title, content, imageUrl, list }) {
  return (
    <>
      <NavBar />
      <div className="flex-cont">
        <div className="box-11">
          <img src={imageUrl} width="100%"></img>
        </div>
        <div className="box-21">
          <h1>{title}</h1>
          <p
            style={{
              fontSize: "20px",
              fontFamily: "sans-serif",
              fontWeight: "bold",
            }}
          >
            {content}
          </p>
          <ul>
            {list &&
              list.map((item, index) => (
                <li className="list-ele" key={index}>
                  {item}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}
