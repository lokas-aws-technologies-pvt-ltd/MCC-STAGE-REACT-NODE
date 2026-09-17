import React, { Component } from 'react';
import Slider from 'react-slick';

const Badminton = () => {
  return (
    <div>
      <section className="inner-banner badminton-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>Badminton</h1>
              <span>
                <a href="/Home">Home</a> - <a href="/Badminton">Sports / Badminton</a>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="main-wrap p-100">
        <div className="container">
          <div className="section-top">
            <h3>Badminton</h3>
            <img src="/assets/images/header-bg.png" alt="" className="img-fluid" />
          </div>
          <div className="inner-content">
            <p>
              Badminton is the one sport that has gained immensely in popularity in the recent decades in India and internationally. At Madras Cricket Club
              (MCC) too, this is reflected in its popularity with Members, who have taken to the game with great enthusiasm over the years. The International
              Class courts at the Club are always buzzing with players, engaged in a friendly but competitive game, to come out on top. Morning & Evening
              sessions see the young and old, men &amp; ladies, beginners, intermediates &amp; champions sweating it out, and enjoying a good workout.
            </p>
            <p>
              MCC has an excellent infrastructure for Badminton, like in other sports, including two excellently maintained courts of high standard, backed by
              the best in lighting, making playing on the Club courts an enjoyable experience. The Club organises regular Badminton events for Members including
              Lightning tournaments, and an IPL style Badminton League, fostering fellowship and camaraderie, and keeping Member interest high at all times. It
              is no surprise therefore that badminton attracts arguably the most new members at MCC, and the highest Member participation among its sports
              disciplines.
            </p>
            <p>
              MCC has also been an organiser of Inter Club tournaments and bilateral ties, to promote the game especially in its home city Chennai. The MCC -
              Prakash Padukone Sports Management tournament for Chennai city Clubs is one such that brought out the competitive spirit in badminton players in
              the city.
            </p>
          </div>
          <div className="c-gallery">
            <h5>Gallery</h5>
            <div className="row mt-5">
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Badminton/DSC_0208.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Badminton/DSC_0277.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Badminton/DSC_0215.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Badminton/badminton-4.jpg" alt="" className="img-fluid" />
              </div>

              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Badminton/badminton-5.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Badminton/badminton-6.jpg" alt="" className="img-fluid" />
              </div>
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
                            <!--<div className="col-lg-4">
                                <h4>Marker Charge</h4>
                                <p>Rs. 10.00/per Game <span>Member Dependent</span></p>
                            </div>-->
                        <!--</div>
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

export default Badminton;
