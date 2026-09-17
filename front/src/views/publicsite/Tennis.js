import React, { Component } from 'react';
import Slider from 'react-slick';

const Tennis = () => {
  return (
    <div>
      <section className="inner-banner tennis-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>Tennis</h1>
              <span>
                <a href="/home">Home</a> - <a href="/tennis">Sports / Tennis</a>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="main-wrap p-100">
        <div className="container">
          <div className="section-top">
            <h3>Tennis</h3>
            <img src="/assets/images/header-bg.png" alt="" className="img-fluid" />
          </div>
          <div className="inner-content">
            <p>
              Tennis has a long and rich heritage at Madras Cricket Club (MCC), perhaps second only to Cricket. Through the years, the MCC Tennis Courts have
              been graced by the presence of Internationals and National level Tennis champions, both among Men & Women, many of whom continue to use the Courts
              even today. MCC has a large group of Tennis enthusiasts, passionate about the game and turning up many mornings or evenings every week to swing
              their racquets, and enjoy a brisk game with friends. Tennis events, from the 'Tin & Ball' events of yesteryears to the special Tennis Mornings &
              Evenings of today, which generate camaraderie and fellowship, have been the binding element in keeping this diverse group of Members - in an age
              range as wide as 10 to 85 years - engaged and active.
            </p>
            <p>
              The roster of Internationals at MCC, includes Ramanathan Krishnan, Rabi Venkatesan, Anand Amritraj, Vijay Amritraj and Ramesh Krishnan among Men,
              and the likes of Lakshmi Mahadevan and Amrita Ahluwalia (Balachandran) among Women. Many National Champions have represented the Club through the
              years. It is no wonder then that MCC has dominated over the decades, the Tennis League in Chennai, one of the best run in the country, and
              measured up well against national Club level competition from across the country.
            </p>
            <p>
              The Club is known to have among the best infrastructure for Tennis, with four international quality clay courts, backed by high quality Lighting,
              and trained &amp; dedicated Staff to manage and maintain the facilities. Add the Club infrastructure of Catering & Dressing Rooms to this, and it
              would make the venue most suitable for conducting Tournaments - National & International. MCC has been the venue of choice for the National Junior
              Clay Court Championships, for more than two decades, and at least one more ITF Futures event, for almost a decade.
            </p>
            <p>
              Guests to the Club can enjoy these excellent facilities, and join in for a game of Tennis with the Club Members, abiding by the Rules in force,
              and following any protocols that may be applicable for Tennis or in general, for Club use.
            </p>
          </div>
          <div className="c-gallery">
            <h5>Gallery</h5>
            <div className="row mt-5">
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Tennis/DSC_0416.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Tennis/tennis-4.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Tennis/DSC_0425.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Tennis/DSC_0427.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Tennis/tennis-5.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Tennis/tennis-6.jpg" alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tennis;
