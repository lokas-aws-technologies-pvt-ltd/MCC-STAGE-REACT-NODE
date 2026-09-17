import React,{ Component, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from 'config.js';

const Footer = () => {
const getYear = new Date().getFullYear();
const [data, setData] = useState([]);

const fetchData = React.useCallback(async () => {
  document.body.classList.add('spinner');
  const response = await axios.get(`${API_URL}general/general_get`, { params: {} });

  setTimeout(() => {

    setData(response.data.result[0]);

    document.body.classList.remove('spinner');
  }, 1000);
}, []);

useEffect(() => {
  fetchData();
}, []);
  return (
    <div>
      <footer>
        <div className="row mb-5">
          <div className="col-lg-3">
            <ul>
              <li>
                <a className="disableClick" href="">
                  CLUB TIMINGS
                </a>
              </li>
            </ul>
            {data  ?
                      <span>Club: {data.clubtime}</span> : <span>Club: 06:00 AM to 12:00 Midnight</span>}
            
            {data  ?
                      <span>Office: {data.officetime}</span> :<span>Office: 10:00 AM to 06:00 PM</span>}
          </div>
          <div className="col-lg-3">
            <ul>
              <li>
                <a href="/aboutus">About us</a>
              </li>
              <li>
                <a href="/Committemembers">Commitee Members</a>
              </li>
              <li>
                <a href="/affiliated">Affiliations</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3">
            <ul>
              <li>
                <a href="/library">Library</a>
              </li>
              <li>
                <a href="/contactus">Contact us</a>
              </li>
              <li>
                <a href="/login">Member LOGIN</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3">
            <ul>
              <li>
                <a className="disableClick" href="/contactus">
                  CONTACT
                </a>
              </li>
            </ul>
            {/* <span>044 - 28523976, 28550341</span> */}
            {data  ?
                      <span>{data.phone}</span> : <span>044 - 28523976, 044 - 28550341</span>}
            {/* <span>contact@madrascricketclub.org</span> */}
            {data  ?
                      <span>{data.email}</span> : <span>contact@madrascricketclub.org</span>}
          </div>
        </div>
        <div className="row text-center">
          <div className="col-lg-12">
            <div className="copy-rights">Copyright &copy; {getYear} Madras Cricket Club. All Rights Reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
