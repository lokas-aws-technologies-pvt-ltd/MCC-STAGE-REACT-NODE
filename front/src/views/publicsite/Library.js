import React, { Component } from 'react';
import Slider from 'react-slick';

const Library = () => {
  return (
    <div>
      <section className="inner-banner library-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>Library</h1>
              <span>
                <a href="/home">Home</a> - <a href="/library">Pursuit / Library</a>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="main-wrap p-100">
        <div className="container">
          <div className="section-top">
            <h3>Library</h3>
            <img src="/assets/images/header-bg.png" alt="" className="img-fluid" />
          </div>
          <div className="inner-content">
            <p>
              The MCC Library, has for decades been a place Members love to visit to browse for Books - to take away for a relaxed read at home - or to simply
              glance through the pages of their Magazine of choice and catch up on exciting news that may interest them. Away from the bustle of games,
              restaurants, bar and lounges, the Library offers a quiet ambience for people to immerse themselves in books of their favourite authors.
            </p>
            <p>
              The Library has a rich collection of over 5000 books, from a wide genre including Popular Fiction - International &amp; Indian authors, Non
              Fiction, General Interest books (Self Help, Health, Cookery etc), Children's books, Business &amp; Econmics, Philosophy &amp; Sprituality,
              Biography, Sports, and Regional Language books. The Club has an excellent collection of Sports boooks, in keeping with its strong sports history.
              So, young & old, students & business people, sports lovers & serious thinkers, will all find books of interest for them in the MCC Library. Over
              the years, with inputs from regular Users, the Library has expanded its footprint of Book categories, and it is a constant endeavour to acquire
              the latest available books and magazines, that reflect the needs and tastes of the Club Members.
            </p>
            <p>
              The MCC Library uses a Library Management System, a digital platform that helps Members to check out books from their favourite authors that they
              can book online, or reserve a new book acquired by the Library, or to extend the date of return of their book.
            </p>
          </div>
          <div className="c-gallery">
            <h5>Gallery</h5>
            <div className="row mt-5">
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Library/DSC_0012.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Library/DSC_0026.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Library/DSC_0040.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Library/DSC_0046.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Library/DSC_0049.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Library/DSC_0072.jpg" alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Library;
