import React, { Component } from 'react';
import Slider from 'react-slick';

const Events = () => {
  return (
    <div>
      <section className="inner-banner event-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>Events at the MCC</h1>
              <span>
                <a href="/home">Home</a> - <a href="/events">Events</a>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="main-wrap event-wrap p-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="event-lft">
                <h4>Sports</h4>
                <ul className="event-lft-nav">
                  <li>
                    <a href="#"> &gt; Hockey Events</a>
                  </li>
                  <li>
                    <a href="#" className="active">
                      {' '}
                      &gt; Tennis Events
                    </a>
                  </li>
                  <li>
                    <a href="#"> &gt; Squash Events</a>
                  </li>
                </ul>
                <h4>Entertainment</h4>
                <ul className="event-lft-nav">
                  <li>
                    <a href="#"> &gt; Movie Night</a>
                  </li>
                  <li>
                    <a href="#" className="active">
                      {' '}
                      &gt; Tambola Night
                    </a>
                  </li>
                  <li>
                    <a href="#"> &gt; Others</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-9 event-right">
              <div className="row">
                <div className="col-lg-2">
                  <h2>
                    AUG <span>2021</span>
                  </h2>
                </div>
                <div className="col-lg-10">
                  <img src="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" />
                  <h4>MCC -S.R.Subramaniam AITA Memorail Natinal Tennis tournament 2019</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse..
                  </p>
                  <h6>Venue</h6>
                  <h5>Madras Cricket club, Chennai</h5>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-2">
                  <h2>
                    AUG <span>2021</span>
                  </h2>
                </div>
                <div className="col-lg-10">
                  <img src="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" />
                  <h4>MCC -S.R.Subramaniam AITA Memorail Natinal Tennis tournament 2019</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse..
                  </p>
                  <h6>Venue</h6>
                  <h5>Madras Cricket club, Chennai</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
