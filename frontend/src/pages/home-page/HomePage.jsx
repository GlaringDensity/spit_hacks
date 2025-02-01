import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import cofee from "../../assets/cofee.png";
import samosa from "../../assets/samosa.png";
import dosa from "../../assets/dosa.png";
import noodles from "../../assets/noodles.png";

const Homepage = () => {
  return (
    <>
    <div className="title">Canteen Hub</div>
      <div className="overlay-background"></div>
      <div className="px-5" style={{ background: 'linear-gradient(to right, #ffffff, #f4f8ff)' }}
      >
        <div className="landing-page-div">
          <br /><br /><br />
          <div className="row pt-5">
            <div className="col-6"></div>
            <div className="col-6">
              {/* <img src="../src/assets/_-removebg.png" alt="chef" style={{ height: "80%", width: "75%", background: "transparent",  }}  className="chef"/> */}
            </div>
          </div>
          <div className="landing-page-header w-50 h-50" >CanteenHub<br/>This is our canteenHub</div>
        </div>

        <div className="d-flex justify-content-center">
          <img src="../src/assets/1000127268-Photoroom.png" alt="" style={{ height: "8%", width: "28%", left: "270px", top: "200px" }} data-aos="fade-down" />
        </div>
        {/* <div className=""> */}
        <div className="menu-header">
          <h3 className="" data-aos="fade-down">From Breakfast to Chat – We've Got It All!</h3>
        </div>
        <br /><br />
        <div className="menu-card-div px-5">
          <div className="row gx-5" data-aos="fade-left">
            <div className="col-7">
              <p style={{ fontSize: "xx-large" }}>Start your day with a delicious and energizing breakfast! From crispy toast and buttery croissants to fluffy pancakes and protein-rich omelets, we offer a variety of options to fuel your morning. Whether you prefer something light or a hearty meal, we have the perfect choice for you.</p>
            </div>
            <div className="col-5">
              <div className="menu-card">
                <div className="red">
                  <h5 className="text-white">Breakfast</h5>
                </div>
                <img src={cofee} className="image" alt="tea" style={{ width: "25%", height: "55%", right: "-35px", top: "180px" }} />
                <div>
                  <br /><br /><br /><br />
                  <Link to="/food/breakfast">
                    <button className="button btn-outline-primary">See More</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <br /><br /><br /><br />
          <div className="row gx-5" data-aos="fade-right">
            <div className="col-5">
              <div className="menu-card">
                <div className="red">
                  <h5 className="text-white">South-Indian</h5>
                </div>
                <img src={dosa} className="dosa" alt="dosa" style={{ width: "20%", height: "50%", left: "270px", top: "200px" }} />
                <div>
                  <br /><br /><br /><br />
                  <Link to="/food/indian">
                    <button className="button btn-outline-primary">See More</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-7">
              <p style={{ fontSize: "xx-large" }}>Enjoy the authentic taste of South India with our flavorful dishes! From crispy dosas and soft idlis to crunchy vadas and aromatic sambar, every bite is made with fresh ingredients and traditional recipes. Perfectly balanced in taste and nutrition, these meals are a delight for every food lover.

              </p>
            </div>
          </div>
          <br /><br /><br /><br />
          <div className="row gx-5" data-aos="fade-left">
            <div className="col-7">
              <p style={{ fontSize: "xx-large" }}>Indulge in the bold flavors of Chinese cuisine with our sizzling noodles, fragrant fried rice, and crispy spring rolls. Whether it’s tangy Manchurian or spicy stir-fried vegetables, every dish is cooked to perfection with fresh ingredients and aromatic spices for an unforgettable taste.</p>
            </div>
            <div className="col-5">
              <div className="menu-card">
                <div className="red">
                  <h5 className="text-white">Chinese</h5>
                </div>
                <img src={noodles} className="chinese" alt="noodles" style={{ width: "20%", height: "50%", right: "-1px", top: "208px" }} />
                <br /><br /><br />
                <div>
                  <Link to="/food/chinese">
                    <button className="button btn-outline-primary">See More</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <br /><br /><br /><br />
          {/* <div className="row gx-5" data-aos="fade-right">
            <div className="col-5">
              <div className="menu-card breakfast">
                <div className="red">
                  <h5 className="text-white">Chat</h5>
                </div>
                <img src={samosa} className="samosa" alt="samosa" style={{ width: "25%", height: "50%", left: "-700px" }} />
                <div>
                  <Link to="/food/chat">
                    <button className="button btn-outline-primary">See More</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-7">
              <p style={{ fontSize: "large" }}>Satisfy your street food cravings with our lip-smacking chat items! From crispy pani puri and spicy bhel puri to tangy sev puri, every dish is a burst of flavor. Made fresh with the perfect mix of crunch, spice, and zest, our chat menu brings you the best of Indian street food.</p>
            </div>
          </div> */}
        </div>
        <br /><br /><br /><br />


      </div >
    </>
  );
};

export default Homepage;
