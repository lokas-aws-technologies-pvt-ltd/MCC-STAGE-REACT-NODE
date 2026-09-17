import React, { Component } from 'react';
import Slider from 'react-slick';

const Billiards = () => {
  return (
    <div>
      <section className="inner-banner billiards-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>Billiards</h1>
              <span>
                <a href="/home">Home</a> - <a href="billiards.html">Sports / Billiards</a>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="main-wrap p-100">
        <div className="container">
          <div className="section-top">
            <h3>Billiards</h3>
            <img src="/assets/images/header-bg.png" alt="" className="img-fluid" />
          </div>
          <div className="inner-content">
            <p>
              Billiards and Snooker, introduced in MCC at the turn of the century (1907), has grown gradually into a popular sport, over the decades. The isport
              perhaps got a fillip with the renovated Billiards Room being inaugurated in 1990.
            </p>
            <p>
              MCC has hosted many tournaments since, and national players like Geet Sethi and Yasin Merchant have been seen in action. Meanwhile, youngsters
              from the Club excelled at the national level, with Siddarth Rao winning the national Snooker title in 1996. All this exposure had its impact on
              more youngsters taking to the game at MCC.
            </p>
            <p>
              MCC continues to remain a venue for many tournaments, and over the years built up a good team that has a strong presence in the game. MCC hosted
              the All India six-Red Snooker Tournament in which its young players did exceptionally well.
            </p>
          </div>
          <div className="c-gallery">
            <h5>Gallery</h5>
            <div className="row mt-5">
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Billiards/Bill-0001.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Billiards/Bill-0002.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Billiards/Bill-0003.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Billiards/Bill-0004.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Billiards/Bill-0005.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Billiards/Bill-0006.jpg" alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Billiards;
