import React, { Component } from 'react';
import Slider from 'react-slick';

const Restaurants = () => {
  return (
    <div>
      <section className="inner-banner diningFacilities-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>Dining Facilities</h1>
              <span>
                <a href="/home">Home</a> - <a href="/restaurants">Social / Dining Facilities</a>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="main-wrap p-100">
        <div className="container">
          <div className="section-top">
            <h3>Dining Facilities</h3>
            <img src="/assets/images/header-bg.png" alt="" className="img-fluid" />
          </div>
          <div className="inner-content">
            <p>The Club has two primary dining facilities - The Pavilion and Bouncer.</p>
            <p>
              The larger facility, The Pavilion, overlooks the famous Chepauk Cricket ground, and provides a panoramic view of the ground for Members, while
              they enjoy their meal or snack. The Pavilion also serves as a dining venue on special occasions like Event Nights - be it Entertainment or Sports
              - and as a general meeting place, where Members may choose to wind down after a workout or a long walk on the ground, in the company of fellow
              Members.
            </p>
            <p>
              Bouncer is a cosy mini-restaurant where Members choose to dine with their extended family and friends. From quiet singles in corner tables, to
              noisy family tables with adults and children, the place is alive through the evening, as Members enjoy their day out at the Club.
            </p>
            <p>
              The common Menu for both dining facilities consists of a wide variety of cuisines, and caters to various Indian regional tastes apart from
              Continental and Chinese, and to Members and dependents across age groups. The Menu is frequently refreshed, and for many weeks every year there
              are special weekend menus added, that literally spice up the dining experience at MCC!
            </p>
          </div>
          <div className="c-gallery">
            <h5>Gallery</h5>
            <div className="row mt-5">
              <div className="col-lg-2 col-sm-6" />
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Dinning/Dinning-1.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Dinning/Dinning-2.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-2 col-sm-6" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Restaurants;
