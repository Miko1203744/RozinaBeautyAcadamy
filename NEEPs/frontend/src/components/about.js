import React from "react";
import NavBar from "./navbar";
import Footer from "./footer";
export default function About() {
  const [color, setColor] = React.useState("green");
  const [is_Visible, setIs_Visible] = React.useState(true);
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);

  // Check for small screen on initial load and window resize
  React.useEffect(() => {
    const checkScreenSize = () => {
      const isSmall = window.innerWidth <= 768;
      setIsSmallScreen(isSmall);
      if (!isSmall) {
        setIs_Visible(true); // Always visible on larger screens
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Hide navigation bar after 3 seconds on small screens
  React.useEffect(() => {
    if (isSmallScreen) {
      const timer = setTimeout(() => setIs_Visible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isSmallScreen]);
  return (
    <>
     <nav className={`nav1 ${is_Visible ? "visible" : "hidden"}`}  style={{
          backgroundColor: color }}>
          <div className="contact">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                height="20px"
                width="20px"
              >
                <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
              </svg>
              +251993801606, +251942627927
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                height="20px"
                width="20px"
              >
                <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
              </svg>
              megenaga selam tower 8th floor
            </div>
          </div>
          <div className="social">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                height="20"
                width="20"
              >
                <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
              </svg>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                height="20px"
                width="20px"
              >
                <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
              </svg>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                height="20px"
                width="20px"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                height="20px"
                width="20px"
              >
                <path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z" />
              </svg>
            </li>
          </div>
        </nav>
        <hr />
      <NavBar />
      <div className="about-item1">
        <div className="item-a">
          <img src="../../static/images/img6.jpg" height="100%" width="80%" />
        </div>
        <div className="item-b">
          <div>
            <img
              style={{ position: "relative", top: "20px" }}
              src="../../static/images/curve.png"
              height="40px"
              width="100px"
              alt=""
            />
            <h1>objective</h1>
            <p
              style={{
                fontSize: "20px",
                fontFamily: "sans-serif",
                fontWeight: "bold",
              }}
            >
              Creating comprehensive rules, regulations, and responsibilities
              for staff members in a beauty academy is essential to ensure
              smooth operations, maintain professionalism, and provide
              high-quality education to students. Here are some suggested
              guidelines and responsibilities for various staff members:
            </p>
            <button>learn more</button>
          </div>
        </div>
      </div>

      <div className="about-item2">
        <div className="item-b">
          <div>
            <img
              style={{ position: "relative", top: "20px" }}
              src="../../static/images/curve.png"
              height="40px"
              width="100px"
              alt=""
            />
            <h1>OURMISSION</h1>
            <p
              style={{
                fontSize: "20px",
                fontFamily: "sans-serif",
                fontWeight: "bold",
              }}
            >
              Attendance and Punctuality: Adhere to the working hours and inform
              the management in advance in case of any absence or lateness.
              Communication: Communicate effectively and respectfully with
              students, colleagues, and management. Confidentiality: Maintain
              the confidentiality of student records and any other sensitive
              information. Safety and Hygiene: Follow all safety and hygiene
              protocols to ensure a safe learning environment.
            </p>
            <button>learn more</button>
          </div>
        </div>
        <div className="item-a">
          <img src="../../static/images/img7.jpg" height="100%" width="80%" />
        </div>
      </div>
      <div className="about-item3">
        <div className="item-3b">
          <h1 style={{ textDecoration: "underline" }}>OUR STORY</h1>
          <p
            style={{
              fontSize: "20px",
              fontFamily: "sans-serif",
              fontWeight: "bold",
            }}
          >
            moisturizing and regenerate formula
          </p>
          <p>sdfggfsdfgdgdg</p>
        </div>
        <div className="item-3a">
          <img src="../../static/images/img8.jpg" height="100%" width="80%" />
        </div>
      </div>
      {/*<div className="foot-img">
          <div className="sl"><img src="/src/image/roza1.png"/></div>
          <div className="sl"><img src="/src/image/roza2.jpg"/></div>
          <div className="sl"><img src="/src/image/roza3.png" /></div>
          <div className="sl"><img src="/src/image/beauty1.jpg"/></div>
          <div><img src="/src/image/1.jpg" /></div>
          <div><img src="/src/image/1.jpg" /></div>
          <div><img src="/src/image/1.jpg" /></div>
          <div><img src="/src/image/1.jpg" /></div>
          <div><img src="/src/image/1.jpg" /></div>
    </div>*/}

      <div class="stock-ticker">
        <ul>
          <li class="minus">
            <img src="../../static/images/makeup.jpg" alt="" />
          </li>
          <li class="minus">
            <img src="../../static/images/nail.jpg" alt="" />
          </li>
          <li class="minus">
            <img src="../../static/images/hair.jpg" alt="" />
          </li>
          <li class="minus">
            <img src="../../static/images/nail.jpg" alt="" />
          </li>
          <li class="minus">
            <img src="../../static/images/makeup.jpg" alt="" />
          </li>
          <li class="minus">
            <img src="../../static/images/nail4.jpg" alt="" />
          </li>
          <li class="minus">
            <img src="../../static/images/makeup.jpg" alt="" />
          </li>
          <li class="minus">
            <img src="../../static/images/hair.jpg" alt="" />
          </li>
        </ul>

        <ul aria-hidden="true">
          <li class="minus">
            <img src="../../static/images/hair.jpg" alt="" />
          </li>
          <li class="minus">
            <img src="../../static/images/hina.jpg" alt="" />
          </li>
          <li class="minus">
            <img src="../../static/images/nail4.jpg" alt="" />
          </li>
          <li class="minus">
            <img src="../../static/images/makeup.jpg" alt="" />
          </li>
          <li class="minus">
            <img src="../../static/images/hair.jpg" alt="" />
          </li>
          <li class="minus">
            <img src="../../static/images/hina.jpg" alt="" />
          </li>
          <li class="minus">
            <img src="../../static/images/makeup.jpg" alt="" />
          </li>
          <li class="minus">
            <img src="../../static/images/nail4.jpg" alt="" />
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
}
