import React, { Component } from 'react';
import Slider from 'react-slick';

const Squash = () => {
  return (
    <div>
      <section className="inner-banner squash-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>Squash</h1>
              <span>
                <a href="/home">Home </a>- <a href="/squash">Sports / Squash</a>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="main-wrap p-100">
        <div className="container">
          <div className="section-top">
            <h3>Squash</h3>
            <img src="/assets/images/header-bg.png" alt="" className="img-fluid" />
          </div>
          <div className="inner-content">
            <p>
              Squash is arguably the sport that tests individual fitness the most. Given its long heritage as a Club in Sports, with scores of Members who stay
              fit regularly to enjoy their sport, Squash has been a very popular sport, especially among the young, and the fit middle aged Members, and
              continues to remain one of the most active sports in MCC.
            </p>
            <p>
              MCC has three international standard Squash Courts, which are busy through the evenings, with Members going hard at each other in the glassed-in
              courts. Singles or Doubles, the game literally makes one sweat, given its high velocity, and the demands of pace and movement on the player.
            </p>
            <p>
              Squash has a history almost as old as Cricket and Tennis at MCC, with references to the game in MCC, as early as 1884. MCC has a history of
              players over the years that have represented India, with Syed Ispahani, a national champion in the late 60's and captain of the Indian team, to
              the last two decades, when it has seen the rise of its superstars like Joshna Chinnappa and Dipika Pallikal - both highly ranked and awarded for
              their achievements in the international circuit - and a host of other champions.
            </p>
          </div>
          <div className="c-gallery">
            <h5>Gallery</h5>
            <div className="row mt-5">
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Squash/0Q3A4634.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Squash/0Q3A4640.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Squash/squash4.jpg" alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Squash;
