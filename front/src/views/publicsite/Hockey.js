import React, { Component } from 'react';
import Slider from 'react-slick';

const Hockey = () => {
  return (
    <div>
      <section className="inner-banner hockey-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>Hockey</h1>
              <span>
                <a href="/home">Home</a> - <a href="/hockey">Sports / Hockey</a>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="main-wrap p-100">
        <div className="container">
          <div className="section-top">
            <h3>Hockey</h3>
            <img src="/assets/images/header-bg.png" alt="" className="img-fluid" />
          </div>
          <div className="inner-content">
            <p>
              Hockey is a sport that MCC can take credit for introducing to Chennai, over a 100 years ago! Club records show that the sport was started in a
              small way in 1894, and MCC started conducting the Madas Hockey tournament from the early 1900s. The game gained in popularity over the years, and
              by the 80's, MCC had a couple of competitive hockey teams Members from other sports disciplines - especially Cricket & Squash - participated
              actively in MCC Hockey, making it a lively sport with a diverse group of players.
            </p>
            <p>
              One of the highlights of MCC Hockey over these decades has been the conduct of the MCC All India Tournament. With the efforts of the big hockey
              enthusiasts in the Club, some of whom were National &amp; International level players, like Munir Sait, MCC has found corporate support for this
              prestigious tournament. It is now the MCC Murugappa Gold Cup Hockey tournament, since 1996, and one of the most popular events in the Hockey
              calendar, with the best teams in the country participating regularly. MCC now has the distinction of being the Club in the country to conduct a
              major Hockey tournament.
            </p>
          </div>
          <div className="c-gallery">
            <h5>Gallery</h5>
            <div className="row mt-5">
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Hockey/0Q3A3646.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Hockey/0Q3A3684.jpg" alt="" className="img-fluid" />
              </div>

              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Hockey/0Q3A3695.jpg" alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hockey;
