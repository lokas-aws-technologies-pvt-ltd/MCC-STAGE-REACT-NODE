import React, { Component } from 'react';
import Slider from 'react-slick';

const Yorkerbar = () => {
  return (
    <div>
      <section className="inner-banner bar-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>Yorker Bar</h1>
              <span>
                <a href="/home">Home</a> - <a href="/yorkerbar">Social / Yorker Bar</a>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="main-wrap p-100">
        <div className="container">
          <div className="section-top">
            <h3>Yorker Bar</h3>
            <img src="/assets/images/header-bg.png" alt="" className="img-fluid" />
          </div>
          <div className="inner-content">
            <p>
              The Yorker Bar is arguably one of the most popular facilities at MCC, where Members choose to wind down with a drink, after an engrossing game, or
              after a full day at work. It has, over the years, been the place of choice to meet and greet fellow Members, and enjoy an evening conversation to
              catch up on popular topics of the day.
            </p>
            <p>
              With a unique configuration - including an elegant horse-shoe shaped Bar counter - the Yorker provides cozy seating areas for intimate
              conversations and small group interaction.
            </p>
            <p>
              The well stocked Yorker offers a wide range of Wines &amp; Spirits, of Indian and International origin, to satisfy young &amp; old, regular Bar
              users as well as Members who may sit in the Bar to enjoy the monthly special event like a Musical Evening or a Bar Night. The Bar Menu includes an
              excellent choice of short eats to complement the Spirits, with special items on the Event Nights to go with flavour of the evening.
            </p>
            <p>
              A compact Dining area at one end of the Yorker makes it easy for the Member to finish their day with a sumptuous meal to follow their beverages.
            </p>
          </div>
          <div className="c-gallery">
            <h5> Gallery</h5>
            <div className="row mt-5">
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Yorker-bar/Yorker-bar-1.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Yorker-bar/Yorker-bar-3.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Yorker-bar/Yorker-bar-2.jpg" alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Yorkerbar;
