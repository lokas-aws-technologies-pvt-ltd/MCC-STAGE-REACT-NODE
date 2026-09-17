import React, { useState } from 'react';
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Thechambers = () => {
  const [isOpenBookSeatModal, setIsOpenBookSeatModal] = useState(false);

  return (
    <div>
      <section className="inner-banner chambers-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>The Chambers</h1>
              <span>
                <a href="/home">Home</a> - <a href="/thechambers">Stay / Chambers</a>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="main-wrap p-100">
        <div className="container">
          <div className="section-top">
            <h3>The Chambers</h3>
            <img src="/assets/images/header-bg.png" alt="" className="img-fluid" />
          </div>
          <div className="inner-content">
            <p>
              The Chambers at MCC have served as a home away from home to many Member Guests and Affiliate Club Members it has welcomed over the years. With a
              set of ten well appointed rooms, that reflect the sporting traditions of the Club, the facility has provided all that guests are looking for in a
              comfortable stay - wonderful ambience, a range of club facilities, and excellent service. Add the very competitive tariffs of The Chambers to this
              mix, and you have an outstanding value package that any traveller to Chennai would be delighted with.{' '}
            </p>
            <p>
              The Club also offers Long Stay packages that could be an advantage to businessmen visiting the city or Institutions that may have officers on
              assignment. We urge Club Members to recommend a stay at the Club to friends and family, who may be visiting the city - be it for business or to
              attend the annual Music festival, or to watch cricket matches at Chepauk. It will be our endeavour to make their stay a pleasant and memorable
              one.
            </p>
          </div>
          <div className="c-gallery">
            <h5>Gallery</h5>
            <div className="row mt-5">
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Chambers/DSC_1066.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Chambers/DSC_1087.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-4 col-sm-6">
                <img src="/assets/images/Chambers/DSC_1100.jpg" alt="" className="img-fluid" />
              </div>
            </div>
          </div>
          {/* <div>
            <h5>To Book Chamber </h5>
            <div className="row mt-5">
              <div className="col">
                For Member{' '}
                <span>
                  <NavLink  className="btn btn-primary btn-lg" to="/login">Login</NavLink>{' '}
                </span>{' '}
              </div>
              <div className="col">
                For Affiliate Member{' '}
                <span>
                  <Button
                    size="lg"
                    type="button"
                    onClick={() => {
                      setIsOpenBookSeatModal(true);
                    }}
                    className="btn btn-primary btn-lg"
                  >
                    Click Here
                  </Button>
                </span>
              </div>
            </div>
          </div> */}
           {/* <div>
            <h5>To Book Chamber </h5>
            <div className="row mt-5">
              <div className="col">
                For Member{' '}
                <span>
                  <NavLink  className="btn btn-primary btn-lg" to="/login">Login</NavLink>{' '}
                </span>{' '}
              </div>
              <div className="col">
                For Affiliate Member{' '}
                <span>
                  
<NavLink  className="btn btn-primary btn-lg" to="/chamberbooking">Click Here</NavLink>{' '}
                </span>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default Thechambers;
