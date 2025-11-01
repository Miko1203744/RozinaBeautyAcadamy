import React from "react"
import "../App.css"

export default function Footer()
{
    return(
        <>
        <section className="section-6">
        <div style={{ textAlign: "center" }}>
          <div className="nav-6">
            <li>
              <a style={{ textDecoration: "none", color: "white" }} href="#">
                home
              </a>
            </li>
            <li>
              <a style={{ textDecoration: "none", color: "white" }} href="#">
                service
              </a>
            </li>
            <li>
              <a style={{ textDecoration: "none", color: "white" }} href="#">
                gallery
              </a>
            </li>
            <li>
              <a style={{ textDecoration: "none", color: "white" }} href="#">
                blog
              </a>
            </li>
            <li>
              <a style={{ textDecoration: "none", color: "white" }} href="#">
                team
              </a>
            </li>
            <li>
              <a style={{ textDecoration: "none", color: "white" }} href="#">
                contact
              </a>
            </li>
          </div>
          <div style={{ color: "white", marginTop: "5px" }}>
            <h1>Roza Beauty Acadamy</h1>
          </div>
          <div style={{ color: "white" }}>
            <a>Facebook/&nbsp;</a> <a>instagram/&nbsp;</a>
            <a>youtube</a>
          </div>
        </div>
      </section>
      </>
    )
}