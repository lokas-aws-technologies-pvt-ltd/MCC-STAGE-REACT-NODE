import React, { Component } from 'react';
import Slider from 'react-slick';

const Otherwellness = () => {
  return (
    <div>
      <section className="inner-banner otherWellness-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>Other Wellness facilities</h1>
              <span>
                <a href="/home">Home</a> - <a href="/otherwellness">Wellness / Other Wellness facilities</a>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="main-wrap p-100">
        <div className="container">
          <div className="section-top">
            <h3>Other Wellness facilities</h3>
            <img src="/assets/images/header-bg.png" alt="" className="img-fluid" />
          </div>
          <div className="inner-content">
            <p>
              The Club has a Massage section manned by a Masseur, for Members to relax their tired muscles, and de-stress after a competitive workout or game.
              The Steam Room in the Sports Complex, likewise, allows individuals to relax after a workout, improving circulation and their skin health. A
              Hairdressing facility with a dedicated grooming specialist rounds off the Wellness facilities, offering Members the opportunity to look their best
              for their evenings out.{' '}
            </p>
          </div>
          <div className="c-gallery">
            <h5>Gallery</h5>
            <div className="row mt-5">
              <div className="col-lg-2 col-sm-6" />
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Other-facilities/other-facilities-1.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Other-facilities/other-facilities-2.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-2 col-sm-6" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Otherwellness;
