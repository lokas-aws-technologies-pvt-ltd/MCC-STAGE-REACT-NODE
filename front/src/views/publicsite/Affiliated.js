import React, { useState,useEffect, Component } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { API_URL } from 'config.js';

const Affiliated = () => {
  const [data, setData] = useState([]);
  
  const [tabval, settabval] = useState(1);

  const fetchData = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}general/get_affiliate_club_detail`, { params: {} });

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
                  {data.filter(u => u.club_type.includes("D")).map(u => (
                     <div className="col-lg-4 col-sm-6" key={u.id}>
                     <div className="club-logo">
                       {/* <!--<img src="images/affliad-logos/001.png" alt="">--> */}
                       <h5>{u.club_name}</h5>
                       <span>{u.address}</span>
                     </div>
                   </div>
                    ))}
                 

                </div>
              </div>

              {/* <!--end-state --> */}

              <div id="International" className={tabval === 2 ? `tab-pane active` : `tab-pane`}>
                <div className="row">
                {data.filter(u => u.club_type.includes("I")).map(u => (
                     <div className="col-lg-4 col-sm-6" key={u.id}>
                     <div className="club-logo">
                       {/* <!--<img src="images/affliad-logos/001.png" alt="">--> */}
                       <h5>{u.club_name}</h5>
                       <span>{u.address}</span>
                     </div>
                   </div>
                    ))}
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
