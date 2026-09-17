import React, { Component } from 'react';
import Slider from 'react-slick';

const Gym = () => {
  return (
    <div>
      <section className="inner-banner gym-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>Gym</h1>
              <span>
                <a href="/home">Home</a> - <a href="/gym">Wellness / Gymnasium</a>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="main-wrap p-100">
        <div className="container">
          <div className="section-top">
            <h3>Gymnasium</h3>
            <img src="/assets/images/header-bg.png" alt="" className="img-fluid" />
          </div>
          <div className="inner-content">
            <p>
              Members of a premier Sports club like MCC value their fitness to enjoy the games of their choice. And fittingly, MCC provides for its Members a
              large and well equipped Gymnasium, that helps them to work out and maintain their levels of fitness, building muscle tone, strength and
              flexibility, or improving cardiovascular endurance, or simply staying at the desired individual weight. The Gymnasium is part of the Sports
              Complex at MCC, and overlooks the Swimming Pool area.
            </p>
            <p>
              The Gymnasium is equipped, in one section, with a range of Cardio devices for active MCCians to work out regularly, listening to music, or viewing
              Television or simply taking in the sights around the Complex. On the other half of the Gymnasium are Weights and Fitness machines, with Trainers
              available to guide Members on the use of these devices for their fitness.
            </p>
          </div>
          <div className="c-gallery">
            <h5>Gallery</h5>
            <div className="row mt-5">
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Gym/gym-2.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Gym/DSC_0003.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Gym/gym-3.jpg" alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gym;
