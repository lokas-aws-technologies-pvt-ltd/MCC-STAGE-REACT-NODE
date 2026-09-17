import React, { useState, Component } from 'react';
import Slider from 'react-slick';

const Affiliated = () => {
  const [tabval, settabval] = useState(1);
  return (
    <div>
      <section className="inner-banner affiliate-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>Affiliated Clubs</h1>
              <span>
                <a href="/home">Home</a> - <a href="/Affiliated">Affiliated Clubs</a>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="main-wrap about-wrap p-100 pb-0">
        <div className="container">
          <div className="section-top">
            <h3>Affiliated Clubs</h3>
            <img src="/assets/images/header-bg.png" alt="" className="img-fluid" />
          </div>

          <div className="club-tabs">
            <ul className="inner-tabs">
              <li className="nav-item">
                <a className={tabval === 1 ? `tablinks active` : `tablinks`} style={{ textDecoration: 'none' }} onClick={() => settabval(1)} href="#">
                  Domestic Clubs
                </a>
              </li>
              <li className="nav-item">
                <a className={tabval === 2 ? `tablinks active` : `tablinks`} style={{ textDecoration: 'none' }} onClick={() => settabval(2)} href="#">
                  International Clubs
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div id="Domestic" className={tabval === 1 ? `tab-pane active` : `tab-pane`}>
                <div className="row">
                  {/* <!--state --> */}

                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/001.png" alt="">--> */}
                      <h5>The Coimbatore Club</h5>
                      <span>Coimbatore, Tamilnadu</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/002.png" alt="">--> */}
                      <h5>Coonoor Club</h5>
                      <span>Coonoor, Tamilnadu</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/003.png" alt="">--> */}
                      <h5>Wellington Gymkhana Club</h5>
                      <span>Wellington, Tamilnadu</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/004.png" alt="">--> */}
                      <h5>Ootacamund Gymkhana Club</h5>
                      <span>Ootacamund, Tamilnadu</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/005.png" alt="">--> */}
                      <h5>The Kodaikanal Club</h5>
                      <span>Kodaikanal, Tamilnadu</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/006.png" alt="">--> */}
                      <h5>The Kodaikanal Golf Club</h5>
                      <span>Kodaikanal, Tamilnadu</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/007.png" alt="">--> */}
                      <h5>High Range Club</h5>
                      <span>Munnar, Kerala</span>
                    </div>
                  </div>

                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/008.png" alt="">--> */}
                      <h5>The Trivandrum Tennis Club</h5>
                      <span>Thiruvananthapuram, Kerala</span>
                    </div>
                  </div>

                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/009.png" alt="">--> */}
                      <h5>Trivandrum Club</h5>
                      <span>Thiruvananthapuram, Kerala</span>
                    </div>
                  </div>

                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/010.png" alt="">--> */}
                      <h5>Cochin Club</h5>
                      <span>Kochi, Kerala</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/011.png" alt="">--> */}
                      <h5>Cochin Gymkhana Club</h5>
                      <span>Kochi, Kerala</span>
                    </div>
                  </div>

                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/018.png" alt="">--> */}
                      <h5>The Cosmopolitan Club Kalpetta</h5>
                      <span>Wayanad, Kerala</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/017.png" alt="">--> */}
                      <h5>Bangalore Club</h5>
                      <span>Bangalore, Karnataka</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/018.png" alt="">--> */}
                      <h5>Bangalore Golf Club</h5>
                      <span>Bangalore, Karnataka</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/017.png" alt="">--> */}
                      <h5>Bowring Institute</h5>
                      <span>Bangalore, Karnataka</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/018.png" alt="">--> */}
                      <h5>The Karnataka State Cricket Association Club House</h5>
                      <span>Bangalore, Karnataka</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/018.png" alt="">--> */}
                      <h5>Jayachamaraja Wadiyar Golf Club</h5>
                      <span>Mysore, Karnataka</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/017.png" alt="">--> */}
                      <h5>Sri Kanteerava NarasimhaRaja Sports Club</h5>
                      <span>Mysore, Karnataka</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/018.png" alt="">--> */}
                      <h5>The Bamboo Club</h5>
                      <span>Coorg, Karnataka</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/018.png" alt="">--> */}
                      <h5>Coorg Golf Links</h5>
                      <span>Coorg, Karnataka</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/018.png" alt="">--> */}
                      <h5>Coorg Sports Club</h5>
                      <span>Coorg, Karnataka</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/018.png" alt="">--> */}
                      <h5>Chikmagalur Golf Club</h5>
                      <span>Chikmagalur, Karnataka</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/018.png" alt="">--> */}
                      <h5>Mercara Downs Golf Club</h5>
                      <span>Madikeri, Karnataka</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/018.png" alt="">--> */}
                      <h5>North Coorg Club</h5>
                      <span>Madikeri, Karnataka</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/017.png" alt="">--> */}
                      <h5>Mangalore Club</h5>
                      <span>Mangalore, Karnataka</span>
                    </div>
                  </div>

                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/015.png" alt="">--> */}
                      <h5>Secunderabad Club</h5>
                      <span>Secunderabad, Telangana</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/016.png" alt="">--> */}
                      <h5>Waltair Club</h5>
                      <span>Visakhapatnam, Andhra Pradesh</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/017.png" alt="">--> */}
                      <h5>The Calcutta Racket Club</h5>
                      <span>Kolkata, West bengal</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/018.png" alt="">--> */}
                      <h5>Calcutta Cricket & Football Club</h5>
                      <span>Kolkata, West Bengal</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/012.png" alt="">--> */}
                      <h5>The Tollygunge Club</h5>
                      <span>Kolkata, West Bengal</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/013.png" alt="">--> */}
                      <h5>Bengal Rowing Club</h5>
                      <span>Kolkata, West Bengal</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/014.png" alt="">--> */}
                      <h5>Bhubaneswar Club</h5>
                      <span>Bhubaneswar, Odisha</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/017.png" alt="">--> */}
                      <h5>Bombay Gymkhana Club</h5>
                      <span>Mumbai, Maharashtra</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/018.png" alt="">--> */}
                      <h5>The Cricket Club of India</h5>
                      <span>Mumbai, Maharashtra</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/018.png" alt="">--> */}
                      <h5>MIG Cricket Club</h5>
                      <span>Mumbai, Maharashtra</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/018.png" alt="">--> */}
                      <h5>United Services Club</h5>
                      <span>Mumbai, Maharashtra</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/017.png" alt="">--> */}
                      <h5>The Sports Club of Gujarat Ltd</h5>
                      <span>Ahmedabad, Gujarat</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/018.png" alt="">--> */}
                      <h5>Indore Tennis Club</h5>
                      <span>Indore, Madhya Pradesh</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/018.png" alt="">--> */}
                      <h5>The Yeshwant Club</h5>
                      <span>Indore, Madhya Pradesh</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/017.png" alt="">--> */}
                      <h5>Jiwaji Club</h5>
                      <span>Gwalior, Madhya Pradesh</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/018.png" alt="">--> */}
                      <h5>Jaipur Club Ltd</h5>
                      <span>Jaipur, Rajasthan</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/017.png" alt="">--> */}
                      <h5>Jaisal Club Ltd</h5>
                      <span>Jaisalmer, Rajasthan</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/018.png" alt="">--> */}
                      <h5>Umed Club</h5>
                      <span>Jodhpur, Rajasthan</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/018.png" alt="">--> */}
                      <h5>India Tennis Centre</h5>
                      <span>New Delhi</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/018.png" alt="">--> */}
                      <h5>Rajindra Gymkhana & Mahindra Club</h5>
                      <span>Patiala, Punjab</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/018.png" alt="">--> */}
                      <h5>Jullundur Gymkhana</h5>
                      <span>Jullundur, Punjab</span>
                    </div>
                  </div>

                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/018.png" alt="">--> */}
                      <h5>Jodhpur Club</h5>
                      <span>Jodhpur, Rajasthan</span>
                    </div>
                  </div>

                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/018.png" alt="">--> */}
                      <h5>The Calcutta Swimming Club</h5>
                      <span>Kolkatta, West Bengal</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!--end-state --> */}

              <div id="International" className={tabval === 2 ? `tab-pane active` : `tab-pane`}>
                <div className="row">
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/021.png" alt="">--> */}
                      <h5>New South Wales Sports Club</h5>
                      <span>Sydney, Australia</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/019.png" alt="">--> */}
                      <h5>Ken Rosewall Tennis</h5>
                      <span>New South Wales, Australia</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/020.png" alt="">--> */}
                      <h5>Kooyong Lawn Tennis Club</h5>
                      <span>Melbourne, Australia</span>
                    </div>
                  </div>

                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/019.png" alt="">--> */}
                      <h5>Colombo Swimming Club</h5>
                      <span>Colombo, Sri Lanka</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/019.png" alt="">--> */}
                      <h5>Singapore Cricket Club</h5>
                      <span>Singapore</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/020.png" alt="">--> */}
                      <h5>Tanglin Club</h5>
                      <span>Singapore</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/020.png" alt="">--> */}
                      <h5>The British Club</h5>
                      <span>Singapore</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/019.png" alt="">--> */}
                      <h5>Royal Ipoh Club</h5>
                      <span>Ipoh, Malaysia</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/019.png" alt="">--> */}
                      <h5>Royal Selangor Club</h5>
                      <span>Kuala Lumpur, Malaysia</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/020.png" alt="">--> */}
                      <h5>The Malacca Club</h5>
                      <span>Malacca, Malaysia</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/021.png" alt="">--> */}
                      <h5>Royal Klang Club</h5>
                      <span>Selangot, Malaysia</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/019.png" alt="">--> */}
                      <h5>Penang Sports Club (Kelab Sukan Pulau Pinang)</h5>
                      <span>Penang, Malaysia</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/020.png" alt="">--> */}
                      <h5>Penang Club</h5>
                      <span>Penang, Malaysia</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/021.png" alt="">--> */}
                      <h5>Enteos Bankers & Industrialists Social Club</h5>
                      <span>Jakarta, Indonesia</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/019.png" alt="">--> */}
                      <h5>Hong Kong Football Club</h5>
                      <span>Hong Kong</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/020.png" alt="">--> */}
                      <h5>Island Squash Rackets Club</h5>
                      <span>Hong Kong</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/021.png" alt="">--> */}
                      <h5>Shanghai East Asia Golf Practising Club</h5>
                      <span>Shanghai, China</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/021.png" alt="">--> */}
                      <h5>Nairobi Gymkhana</h5>
                      <span>Nairobi, Kenya</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/020.png" alt="">--> */}
                      <h5>The Wanderers Club</h5>
                      <span>Johannesburg, South Africa</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/021.png" alt="">--> */}
                      <h5>Harvard Club</h5>
                      <span>Boston, USA</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/019.png" alt="">--> */}
                      <h5>The Georgian Club</h5>
                      <span>Atlanta, USA</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/021.png" alt="">--> */}
                      <h5>Bellevue Club</h5>
                      <span>Washington, USA</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="club-logo">
                      {/* <!--<img src="images/affliad-logos/021.png" alt="">--> */}
                      <h5>The Lansdowne Club</h5>
                      <span>London, UK</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Affiliated;
