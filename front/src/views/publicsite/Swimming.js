import React, { Component } from 'react';
import Slider from 'react-slick';

const Swimming = () => {
  return (
    <div>
      <section className="inner-banner swim-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>Swimming</h1>
              <span>
                <a href="/home">Home</a> - <a href="/swimming">Sports / Swimming</a>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="main-wrap p-100">
        <div className="container">
          <div className="section-top">
            <h3>Swimming</h3>
            <img src="/assets/images/header-bg.png" alt="" className="img-fluid" />
          </div>
          <div className="inner-content">
            <p>
              Swimming is a popular sport and a relaxation activity for MCC Members, looking to chill out after a tiring workout in their favourite sport. It is
              also a fitness routine for young adults, and for the children, it is simply fun time!
            </p>
            <p>
              MCC has an international class Swimming Pool maintained to the highest standards of cleanliness and hygiene. A Children's pool alongside the main
              pool, allows young children to have a good time in the water, under the watchful eyes of their parent.
            </p>
            <p>
              For many months during the year, especially during school holidays in summer, Coaching camps are available for children and adults to learn
              swimming from trained &amp; certified coaches.
            </p>
            <p>
              The pool is also used for group activities like Water Polo competitions, and interesting programs like Aqua Zumba, which finds many Club Members
              participating and enjoying the invigorating workouts.
            </p>
            <p>
              In Chennai, which has warm weather through most of the year, Swimming is open to Members &amp; Club Guests almost for the entire year, for their
              own fitness regimen and for general enjoyment.
            </p>
          </div>
          <div className="c-gallery">
            <h5>Gallery</h5>
            <div className="row mt-5">
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Swimming/001.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Swimming/005.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Swimming/swimming-3.jpg" alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Swimming;
