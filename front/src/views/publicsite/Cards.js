import React, { Component } from 'react';
import Slider from 'react-slick';

const Cards = () => {
  return (
    <div>
      <section className="inner-banner card-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>Cards</h1>
              <span>
                <a href="/home">Home</a> - <a href="cards.html">Pursuit / Cards</a>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="main-wrap p-100">
        <div className="container">
          <div className="section-top">
            <h3>Cards</h3>
            <img src="/assets/images/header-bg.png" alt="" className="img-fluid" />
          </div>
          <div className="inner-content">
            <p>MCC has a Cards Room for Bridge enthusiasts, and Members who may want to relax with a game of Rummy.</p>
            <p>
              Every evening, a bunch of die-hard Card players assemble at this facility to pursue the Card game of their preference, quietly, with focus and
              passion, and enjoy their favourite evening activity at the Club.
            </p>
            <p>MCC also has Bridge teams representing the Club, and participating competitively in local Bridge tournaments.</p>
          </div>
          <div className="c-gallery">
            <h5>Gallery</h5>
            <div className="row mt-5">
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Cards/DSC_1004.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Cards/DSC_1006.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Cards/DSC_1007.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Cards/DSC_1008.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Cards/DSC_1015.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Cards/DSC_1020.jpg" alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cards;
