import React, { Component } from 'react';
import Slider from 'react-slick';

const Yoga = () => {
  return (
    <div>
      <section className="inner-banner yoga-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>Yoga</h1>
              <span>
                <a href="/home">Home</a> - <a href="/yoga">Wellness / Yoga</a>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="main-wrap p-100">
        <div className="container">
          <div className="section-top">
            <h3>Yoga</h3>
            <img src="/assets/images/header-bg.png" alt="" className="img-fluid" />
          </div>
          <div className="inner-content">
            <p>The new Sports Complex houses a Yoga Room, where mind and body come together for the overall well being of the individual.</p>
            <p>
              Members have the benefit of a Yoga teacher & expert to learn from and practice with. Classes are held through the week, and one can choose to
              attend classes with the group that is most appropriate for their level or standard.
            </p>
          </div>
          <div className="c-gallery">
            <h5>Gallery</h5>
            <div className="row mt-5">
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Yoga/Yoga-1.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Yoga/Yoga-3.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Yoga/yoga-3.JPG" alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Yoga;
