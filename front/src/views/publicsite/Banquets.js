import React, { Component } from 'react';
import Slider from 'react-slick';

const Banquets = () => {
  return (
    <div>
      <section className="inner-banner banquets-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>Banquets</h1>
              <span>
                <a href="/home">Home</a> - <a href="/Banquets">Social / Banquets</a>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="main-wrap p-100">
        <div className="container">
          <div className="section-top">
            <h3>Banquets</h3>
            <img src="/assets/images/header-bg.png" alt="" className="img-fluid" />
          </div>
          <div className="inner-content">
            <p>
              MCC has a couple of Banquet Halls to cater to the requirements of its Members. So, be it a Birthday party for Members' children, a social
              gathering of Members with friends, a family get-together, or a formal business meeting, the Banquet facilities can cater to all these needs.
            </p>
            <p>
              The Banquets section is equipped with Catering and Bar services and can serve groups as large as 150, as easily as it can cater to small and
              exclusive groups of 15.
            </p>
            <p>
              Banquet Halls are also utilised on weekends for special Club events and for screening of the latest English &amp; Regional language films, for the
              enjoyment of Members and their families.
            </p>
          </div>
          <div className="c-gallery">
            <h5>Gallery</h5>
            <div className="row mt-5">
              <div className="col-lg-2 col-sm-6" />
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Dinning/Dinning-3.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Dinning/Dinning-4.JPG" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-2 col-sm-6" />
            </div>
            {/* <!--<div className="c-info">
                        <div className="row mb-3">
                            <div className="col-lg-4">
                                <h4>Contact</h4>
                                <p>Mr. Srinivasa Shastry</p>
                            </div>
                            <div className="col-lg-4">
                                <h4>General Manager Contact</h4>
                                <p>044 28548546 / +91 97109 33355</p>
                            </div>
                            <div className="col-lg-4">
                                <h4>Marker Charge</h4>
                                <p>Rs. 10.00/per Game <span>Member Dependent</span></p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4">
                                <h4>Sports Manager</h4>
                                <p>Mr. Thirukumaran <br /> +91 97109 33360</p>
                            </div>
                            <div className="col-lg-8">
                                <h4>Timings</h4>
                                <p><span>Weekdays - </span> 6.00AM  to 9.00AM  /  4.00PM to 9.00PM</p>
                                <p><span>Weekends &amp; Holidays - </span> 6.00AM  to 9.00AM  /  4.00PM to 9.00PM</p>
                            </div>
                        </div>
                    </div>--> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banquets;
