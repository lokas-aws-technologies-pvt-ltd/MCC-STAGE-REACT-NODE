import React, { Component } from 'react';
import Slider from 'react-slick';

const Cricket = () => {
  return (
    <div>
      <section className="inner-banner cricket-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>Cricket</h1>
              <span>
                <a href="/home">Home</a> - <a href="/cricket">Sports / Cricket</a>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="main-wrap p-100">
        <div className="container">
          <div className="section-top">
            <h3>Cricket</h3>
            <img src="/assets/images/header-bg.png" alt="" className="img-fluid" />
          </div>
          <div className="inner-content">
            <p>
              Cricket has been referred to by a senior Member, as the "Soul of MCC", and there cannot be a more appropriate way to describe what the game means
              to the Club. From the early years, Cricket has had a dominant influence on the Club's sporting character and traditions. This is also reflected in
              the long list of Members who have represented the country in Cricket, from CD Gopinath &amp; AG Kripal Singh in the middle of the century to S
              Venkataraghavan and K Srikkanth in the 70s and 80s, to WV Raman &amp; L Sivaramakrishnan towards the close of the century, and a bunch of
              Internationals in the last two decades including L Balaji, Murali Vijay, Dinesh Karthik and R Ashwin.
            </p>
            <p>
              The Club had a wealth of talent over the years, and managed to play two teams in the local League, which boasts of a very high standard among
              local cricket leagues in the country. MCC have been the Winner of the prestigious First Division, through its 'A' team, and after many years, have
              managed to come back into the First Division in 2018, to keep the MCC flag flying high!
            </p>
            <p>
              The flavour of Cricket can also be felt in the Club's facilities, with the Lobby and Mid Wicket Lounge displaying photographs of various
              Cricketers and winning teams associated with the Club. Adorning the walls of the Lounge are plaques that list the names of various local and
              visiting team members, from the days of the British era to the recent times, to preserve the memories of the decades gone by.
            </p>
          </div>
          <div className="c-gallery">
            <h5>Gallery</h5>
            <div className="row mt-5">
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Cricket/001.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Cricket/002.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Cricket/004.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Cricket/Cricket-4.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Cricket/Cricket-5.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Cricket/Cricket-6.jpg" alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cricket;
