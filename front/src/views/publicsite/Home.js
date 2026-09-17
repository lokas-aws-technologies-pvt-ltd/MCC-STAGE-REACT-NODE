import React,{ Component, useEffect, useState }  from 'react';
import Glide from 'components/carousel/Glide';
import { Card } from 'react-bootstrap';
import Slider from 'react-slick';
import axios from 'axios';
import { API_URL } from 'config.js';
import { imageupload } from 'constants.js';

const Home = () => {
  const [data, setData] = useState([]);
  const fetchData = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}general/get_image_upload`, { params: {} });

    setTimeout(() => {

      setData(response.data.result);

      document.body.classList.remove('spinner');
    }, 1000);
  }, []);
  useEffect(() => {
    fetchData();
  
  }, []);
  return (
    <div>
      <section className="banner-image">
        <div className="single-item">
          {/* <div className="holder" style={{backgroundImage: 'url("/assets/images/home-banner-01.jpg")'}}>
          <div className="container">
            <div className="c-text">
              <h1>welcome to madras cricket club.</h1>
              <h2>Sports - a way of life!</h2>
            </div>
          </div>
        </div>
        <div className="holder" style={{backgroundImage: 'url("/assets/images/home-banner-02.jpg")'}}>
              <div className="container">
                  <div className="c-text">
                      <h2>Arjuna awardee Squash champion</h2>
                      <h1>Dipika Pallikal</h1>
                  </div>
              </div>
          </div> */}
          {/* <Glide noControls
            options={{
              gap: 0,
              rewind: false,
              type: 'carousel',
              autoplay: 3000,
              perView: 1,
              breakpoints: {
                400: { perView: 1 }

              },
            }} >
            
            <Glide.Item key="1">
              <div >

                <div className="holder" style={{ backgroundImage: 'url("/assets/images/home-banner-01.jpg")' }}>
                  <div className="container">
                    <div className="c-text">
                      <h1>welcome to madras cricket club.</h1>
                      <h2>Sports - a way of life!</h2>
                    </div>
                  </div>
                </div>

              </div>
            </Glide.Item>

            <Glide.Item key="2">
              <div >
                <div className="holder" style={{ backgroundImage: 'url("/assets/images/home-banner-02.jpg")' }}>
                  <div className="container">
                    <div className="c-text">
                      <h2>Arjuna awardee Squash champion</h2>
                      <h1>Dipika Pallikal</h1>
                    </div>
                  </div>
                </div>
              </div>
            </Glide.Item> 
          </Glide> */}

          <Slider dots={false} slidesToShow={1} slidesToScroll={1} autoplay arrows={false} autoplaySpeed={3000}>
            <div>
            {data.filter(u => u.catname.includes("home-banner")).map(u => (
              
              <div key={u.id} className="holder" style={{ backgroundImage: `url( ${`${imageupload}${u.name}`})`}}>
              <div className="container">
                <div className="c-text">
                  <h1>welcome to madras cricket club.</h1>
                  <h2>Sports - a way of life!</h2>
                </div>
              </div>
            </div>
          ))}
          </div>
          {/* <div>
              <div className="holder" style={{ backgroundImage: 'url("/assets/images/home-banner-02.jpg")' }}>
                <div className="container">
                  <div className="c-text">
                    <h2>Arjuna awardee Squash champion</h2>
                    <h1>Dipika Pallikal</h1>
                  </div>
                </div>
              </div> 
            </div> */}
          </Slider>
        </div>
        <a href="#home-section">
          <img src="/assets/images/down-arrow.png" alt="" />
        </a>
      </section>
      <section className="main-wrap p-100" id="home-section">
        <div className="container">
          <div className="section-top">
            <h3>The MCC of yesterday and tomorrow</h3>
            <img src="/assets/images/header-bg.png" alt="" className="img-fluid" />
          </div>
          <div className="row mb-5">
            <div className="col-lg-6">
              {/* <img src="/assets/images/abt-mcc.png" alt="" className="img-fluid" /> */}
              <img src="/assets/images/yesterday-tomo.png" alt="" className="img-fluid" />
            </div>
            <div className="col-lg-6">
              <p>Cricket grounds came up wherever the British settled and Madras was no exception.</p>
              <p>
                The club, founded in 1846 by Sir Alexander Arbuthnot, has now crossed 175 years of existence and has plenty of new additions as we head out into
                a new era.
              </p>
              <a href="/Aboutus" className="know-more-btn">
                Know More <i className="fa fa-chevron-right" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="gallery-wrap">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <div className="section-header">
                  <h3 className="mb-3">Gallery</h3>
                  <p>Visual walk through of the club existing communities and facilities </p>
                </div>
              </div>
            </div>
            <div className="home-gallery">
              {/* <Glide 
                options={{  

                  gap: 0,
                  rewind: false,
                  type: 'carousel',
                  autoplay: 3000,
                  perView: 2,
                  peek: { before: 5, after: 5 },                  
                  breakpoints: {
                    400: { perView: 1 }

                  },
                }} >
                <Glide.Item className="margin-bottom">
                  <div>
                    <img src="/assets/images/home-gal-1.jpg" alt="" className="img-fluid" />
                  </div>
                </Glide.Item>
                <Glide.Item className="margin-bottom">  <div>
                  <img src="/assets/images/home-gal-2.jpg" alt="" className="img-fluid" />
                </div></Glide.Item>
                <Glide.Item className="margin-bottom">  <div>
                  <img src="/assets/images/home-gal-3.jpg" alt="" className="img-fluid" />
                </div></Glide.Item>
                <Glide.Item className="margin-bottom"> <div>
                  <img src="/assets/images/home-gal-4.jpg" alt="" className="img-fluid" />
                </div></Glide.Item>
                <Glide.Item className="margin-bottom"> <div>
                  <img src="/assets/images/home-gal-5.jpg" alt="" className="img-fluid" />
                </div></Glide.Item>
                <Glide.Item className="margin-bottom"> <div>
                  <img src="/assets/images/home-gal-6.jpg" alt="" className="img-fluid" />
                </div></Glide.Item>
              </Glide> */}
              <Slider dots slidesToShow={2} slidesToScroll={1} autoplay={false} arrows autoplaySpeed={3000}>
              {data.filter(u => u.catname.includes("home-gallery")).map(u => (
                <div key={u.id}>
                  <img src={`${imageupload}${u.name}`} alt="" className="img-fluid" />
                </div>
))}

                {/* <div>
                  <img src="./assets/images/home-gal-1.jpg" alt="" className="img-fluid" />
                </div>
                <div>
                  <img src="./assets/images/home-gal-2.jpg" alt="" className="img-fluid" />
                </div>
                <div>
                  <img src="./assets/images/home-gal-3.jpg" alt="" className="img-fluid" />
                </div>
                <div>
                  <img src="./assets/images/home-gal-4.jpg" alt="" className="img-fluid" />
                </div>
                <div>
                  <img src="./assets/images/home-gal-5.jpg" alt="" className="img-fluid" />
                </div>
                <div>
                  <img src="./assets/images/home-gal-6.jpg" alt="" className="img-fluid" />
                </div> */}
              </Slider>
            </div>
          </div>
          <div className="club-wrap">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <div className="section-header">
                  <h3 className="mb-3">Club facilities</h3>
                  <p>The world class sports infrastructure and amenities at the MCC has fostered a sense of competitive and healthy living for the members.</p>
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-lg-4 col-sm-6">
                <div className="card">
                  <img className="card-img-top" src="/assets/images/Billiards_home.jpg" alt="Card image cap" />
                  <div className="card-body">
                    <h4 className="mb-3">Billiards</h4>
                    <p className="card-text">The billiards room is a crucible for great talent and easy leisure</p>
                    <a href="/billiards" className="card-link">
                      KNOW MORE <i className="fa fa-angle-right" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="card">
                  <img className="card-img-top" src="/assets/images/Badminton_home.jpg" alt="Card image cap" />
                  <div className="card-body">
                    <h4 className="mb-3">Badminton</h4>
                    <p className="card-text">The extensive indoor badminton courts are always in full capacity</p>
                    <a href="/badminton" className="card-link">
                      KNOW MORE <i className="fa fa-angle-right" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="card">
                  <img className="card-img-top" src="/assets/images/Cricket_home.jpg" alt="Card image cap" />
                  <div className="card-body">
                    <h4 className="mb-3">Cricket</h4>
                    <p className="card-text">The native sport of the club gets several upgrades and offers world class facilities</p>
                    <a href="/cricket" className="card-link">
                      KNOW MORE <i className="fa fa-angle-right" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="card">
                  <img className="card-img-top" src="/assets/images/Squash_home.jpg" alt="Card image cap" />
                  <div className="card-body">
                    <h4 className="mb-3">Squash</h4>
                    <p className="card-text">The only extensive facility in the city, the 6 courts attract the pros and the amateurs alike</p>
                    <a href="/squash" className="card-link">
                      KNOW MORE <i className="fa fa-angle-right" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="card">
                  <img className="card-img-top" src="/assets/images/Tennis_home.jpg" alt="Card image cap" />
                  <div className="card-body">
                    <h4 className="mb-3">Tennis</h4>
                    <p className="card-text">the MCC tradition of a game of evening tennis is a never miss at the beautiful and well equipped grounds</p>
                    <a href="/tennis" className="card-link">
                      KNOW MORE <i className="fa fa-angle-right" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="card">
                  <img className="card-img-top" src="/assets/images/gym_home.jpg" alt="Card image cap" />
                  <div className="card-body">
                    <h4 className="mb-3">Gymnasium</h4>
                    <p className="card-text">the refurbished high-end gym is probably the largest in any club in the city</p>
                    <a href="/gym" className="card-link">
                      KNOW MORE <i className="fa fa-angle-right" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="card">
                  <img className="card-img-top" src="/assets/images/SwimmingPool_home.jpg" alt="Card image cap" />
                  <div className="card-body">
                    <h4 className="mb-3">Swimming Pool</h4>
                    <p className="card-text">Where stalwarts come to cool off after a thorough workout or a great game</p>
                    <a href="/swimming" className="card-link">
                      KNOW MORE <i className="fa fa-angle-right" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="card">
                  <img className="card-img-top" src="/assets/images/bar_home.jpg" alt="Card image cap" />
                  <div className="card-body">
                    <h4 className="mb-3">Yorker Bar</h4>
                    <p className="card-text">Renowned for the fine dining and delicious staples, food is a central part of the MCC experience</p>
                    <a href="/yorkerbar" className="card-link">
                      KNOW MORE <i className="fa fa-angle-right" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="card">
                  <img className="card-img-top" src="/assets/images/Library_home.jpg" alt="Card image cap" />
                  <div className="card-body">
                    <h4 className="mb-3">Library</h4>
                    <p className="card-text">A fine collection of the latest and the classics await you at the MCC library curated over several decades</p>
                    <a href="/library" className="card-link">
                      KNOW MORE <i className="fa fa-angle-right" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="text-center">
                  <a href="" className="know-more-btn">Know More <i className="fa fa-chevron-right" aria-hidden="true"></i></a>
              </div> */}
          </div>
          {/* <div className="not-out">
            <div className="row vertical-align">
              <div className="col-lg-6">
                <h3 className="mb-4">
                  <span>175</span> Not out!
                </h3>
                <p>
                  A special edition coffee table book by Madras historian V. Sriram was launched to commemorate the 175th year of the club. All members can
                  collect their copies at the club.
                </p>
              </div>
              <div className="col-lg-6 text-center">
                <img src="/assets/images/not-out-banner.png" alt="" className="img-fluid" />
              </div>
            </div>
          </div> */}
          {/* <div className="protocols">
            <div className="row">
              <div className="col-lg-3 text-center mb-2">
                <img src="/assets/images/covid-protocol.png" alt="" />
              </div>
              <div className="col-lg-9">
                <h5>COVID Protocols</h5>
                <p>The MCC appreciates your cooperation in following these protocols for the safety of the members and guests</p>
                <ul>
                  <li>Please let our personnel check your temperature while entering the Club</li>
                  <li>Please use the sanitisers at the Club entrance and just outside the entrance to every room</li>
                  <li>Please wear your mask at all times while inside the club. The removal of masks is allowed only when eating.</li>
                  <li> Please maintain social distancing and please do adhere to the set Covid-19 seating layouts</li>
                </ul>
              </div>
            </div>
          </div> */}
          {/* <div className="event-wrap p-100">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <div className="section-header">
                  <h3 className="mb-3">CLUB events</h3>
                  <p>After a long hiatus the club will be opening for events in the next few months </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="event-title"><span>Upcoming Event</span></div>
                <div className="row justify-content-center">
                  <div className="col-lg-10">
                    <div className="card">
                      <a href="events.html">
                        <img className="card-img-top" src="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Card image cap" />
                      </a>
                      <div className="card-body">
                        <h6>Aug 2021</h6>
                        <h4 className="mb-3">MCC -S.R.Subramaniam AITA Memorail Natinal Tennis tournament 2019</h4>
                        <p className="card-text">Renowned for the fine dining and delicious staples, food is a central part of the MCC experience</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="event-title"><span>Past Event</span></div>
                <div className="media mb-3">
                  <img src="/assets/images/home-past-event01.jpg" alt="" className="mr-4 mt-2" />
                  <div className="media-body">
                    <small>15th Nov 2020</small>
                    <h4>Memorandum of Association of MCC</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore...</p>
                  </div>
                </div>
                <div className="media">
                  <img src="/assets/images/home-past-event02.jpg" alt="" className="mr-4 mt-2" />
                  <div className="media-body">
                    <small>15th Dec 2020</small>
                    <h4>President's AGM Address</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore...</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default Home;
