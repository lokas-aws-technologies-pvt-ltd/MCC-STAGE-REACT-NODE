import React,{ Component, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from 'config.js';

const Committeemembers = () => {

  const [data, setData] = useState([]);

const fetchData = React.useCallback(async () => {
  document.body.classList.add('spinner');
  const response = await axios.get(`${API_URL}general/get_committee_members`, { params: {pageSize:1,sortBy: [{ id: 'mid', desc: false }]} });

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
              <h1>Committee Members</h1>
              <span>
                <a href="/home">Home</a> - <a href="committee-members.html">Committee Members</a>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="main-wrap about-wrap p-100 pb-0">
        <div className="container">
          <div className="section-top">
            <h3>Committee Members for the Year 2023-2024</h3>
            <img src="/assets/images/header-bg.png" alt="" className="img-fluid" />
          </div>

          <div id="commem" className="c-members">
            {/* <h4 className="text-center"/> */}

            <section className="regular slider row">
           { data && data.map(function (itemData, ite) {
                        // console.log('childdaata', catData[itemData.id]);
                        return (
                          <>
                           <div className="c-members-info col-lg-3 col-sm-6 c-members-info-mb">
                <img src="/assets/images/avatar.jpg" alt="" />
                <h5>{itemData.name}</h5>
                <span>{itemData.designation}</span>
                {/* <p>‘Lotus’, 10, Subba Rao Avenue, Chennai – 600 006.</p> */}
                <a href="#" mailto="">
                {itemData.email}
                </a>
              </div>
                          </>
                        );
                      })}
           
              </section>


            <section  style={{ display: 'none' }} className="regular slider row">
              <div className="c-members-info col-lg-3 col-sm-6 c-members-info-mb">
                <img src="/assets/images/avatar.jpg" alt="" />
                <h5>B. Vijaykumar</h5>
                <span>President</span>
                <p>9 A, Kgeyes Le Imperial, 122, Greenways Road, R. A. Puram, Chennai – 600 028</p>
                <a href="#" mailto="">
                  vijaykumarbommu@gmail.com
                </a>
              </div>
              <div className="c-members-info col-lg-3 col-sm-6 c-members-info-mb">
                <img src="/assets/images/avatar.jpg" alt="" />
                <h5>Dodla Vivek Kumar Reddy</h5>
                <span>Vice President</span>
                <p>‘Lotus’, 10, Subba Rao Avenue, Chennai – 600 006.</p>
                <a href="#" mailto="">
                  vivekreddy93@rediffmail.com
                </a>
              </div>
              <div className="c-members-info col-lg-3 col-sm-6 c-members-info-mb">
                <img src="/assets/images/avatar.jpg" alt="" />
                <h5>R Karthik</h5>
                <span>Honorary Secretary</span>
                <p>3-B, Amara Akasha, 5/1165, Kandanchavadi, OMR, Chennai - 600 096.</p>
                <a href="#" mailto="">
                  rk22@sanmargroup.com
                </a>
              </div>
              <div className="c-members-info col-lg-3 col-sm-6 c-members-info-mb">
                <img src="/assets/images/avatar.jpg" alt="" />
                <h5>Niranjan Mudaliar</h5>
                <span>Honorary Treasurer</span>
                <p>857, Poonamallee High Road, Kilpauk, Chennai – 600 010</p>
                <a href="#" mailto="">
                  niranjanmudaliar@gmail.com
                </a>
              </div>

              <div className="c-members-info col-lg-3 col-sm-6 c-members-info-mb">
                <img src="/assets/images/avatar.jpg" alt="" />
                <h5>S K A Manickavasagam</h5>
                <span>Co opted Past President</span>
                <p>3, Godown Street, Chennai – 600 001</p>
                <a href="#" mailto="">
                  manick789@yahoo.com
                </a>
              </div>

              <div className="c-members-info col-lg-3 col-sm-6 c-members-info-mb">
                <img src="/assets/images/avatar.jpg" alt="" />
                <h5>Akbar Ebrahim</h5>
                <span>Bar & Entertainment</span>
                <p>Meco Motorsports Pvt Ltd, 1st Floor, Murtha Garden, Spurtank Road, Chennai 600 031</p>
                <a href="#" mailto="">
                  akbar@mecomotorsports.com
                </a>
              </div>

              <div className="c-members-info col-lg-3 col-sm-6 c-members-info-mb">
                <img src="/assets/images/avatar.jpg" alt="" />
                <h5>Arjan Kripal Singh</h5>
                <span>Cricket</span>
                <p>3/5, 10th Avenue, Harrington Road, Chennai-600 030</p>
                <a href="#" mailto="">
                  arjankripal@yahoo.co.in
                </a>
              </div>

              <div className="c-members-info col-lg-3 col-sm-6 c-members-info-mb">
                <img src="/assets/images/avatar.jpg" alt="" />
                <h5>R Balaji</h5>
                <span>New Sports Complex, Inter & Intra Club</span>
                <p>‘Shyams Nest’, 13, (Old No.7) 2nd Main Road, R.A. Puram, Chennai - 600 028</p>
                <a href="#" mailto="">
                  balaji_raghavan1@yahoo.co.in
                </a>
              </div>

              <div className="c-members-info col-lg-3 col-sm-6 c-members-info-mb">
                <img src="/assets/images/avatar.jpg" alt="" />
                <h5>B M Bopanna</h5>
                <span>Hockey</span>
                <p>1 B, Magnolia Park, No. 2, Five Furlong Road, Guindy, Chennai - 600 032.</p>
                <a href="#" mailto="">
                  bopsacc@gmail.com
                </a>
              </div>

              <div className="c-members-info col-lg-3 col-sm-6 c-members-info-mb">
                <img src="/assets/images/avatar.jpg" alt="" />
                <h5>S Lakshminarayan</h5>
                <span>Housekeeping, Cards and Club Magazine</span>
                <p>Prema,51, (O.No.23), Sait Colony, Second Street, Egmore, Chennai – 600008</p>
                <a href="#" mailto="">
                  lachu20011@gmail.com
                </a>
              </div>

              <div className="c-members-info col-lg-3 col-sm-6 c-members-info-mb">
                <img src="/assets/images/avatar.jpg" alt="" />
                <h5>Nikhil Swaminadhan</h5>
                <span>Catering and Squash</span>
                <p>7, Gilchrist Avenue, Harrington Road, Chennai – 600 031</p>
                <a href="#" mailto="">
                  showmanindia@yahoo.com
                </a>
              </div>

              <div className="c-members-info col-lg-3 col-sm-6 c-members-info-mb">
                <img src="/assets/images/avatar.jpg" alt="" />
                <h5>S Prasad</h5>
                <span>Library, IT and The Chambers</span>
                <p>247/4, Ambujammal Street , Alwarpet, Chennai – 600 018</p>
                <a href="#" mailto="">
                  prasad.shree@gmail.com
                </a>
              </div>

              <div className="c-members-info col-lg-3 col-sm-6 c-members-info-mb">
                <img src="/assets/images/avatar.jpg" alt="" />
                <h5>R V R K Ranga Rao</h5>
                <span>Tennis</span>
                <p>11, Murugappa Road , Kotturpuram, Chennai – 600 085</p>
                <a href="#" mailto="">
                  rvrkr@rediffmail.com
                </a>
              </div>

              <div className="c-members-info col-lg-3 col-sm-6 c-members-info-mb">
                <img src="/assets/images/avatar.jpg" alt="" />
                <h5>H E Srinivas Shastry</h5>
                <span>Badminton & Snooker</span>
                <p>Old No. 3, New No. 5 A, Poes Garden, Chennai – 600 086</p>
                <a href="#" mailto="">
                  srinivashastry@gmail.com
                </a>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Committeemembers;
