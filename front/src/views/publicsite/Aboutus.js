import React from 'react';
import Slider from 'react-slick';

const Aboutus = () => {
  return (
    <div>
      <section className="inner-banner about-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>MCC Story</h1>
              <span>
                <a href="/home">Home</a> - <a href="/Aboutus">MCC Story / Club History</a>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="main-wrap about-wrap p-100 pb-0">
        <div className="container">
          <div className="section-top">
            <h3>The MCC of yesterday and tomorrow</h3>
            <img src="/assets/images/header-bg.png" alt="" className="img-fluid" />
          </div>
          <div className="row">
            <div className="col-lg-12 text-center abt-intro">
              <h4>The Yesterdays</h4>
              <p>
                While there are records of the Madras Cricket Club (MCC) having its origins in 1846, the club did not have a home ground until 1865. Chepauk,
                not actually the first choice, which was home to barracks and administrative offices was chosen and permission granted as per GO No 401 dated
                April 20, 1865.The inside story was that the permission was granted to block access to the Chepauk palace from the rear!
              </p>
            </div>
          </div>
          <div className="about-content">
            <div className="row mb-5">
              <div className="col-lg-6 col-sm-6">
                <img src="/assets/images/abt-img-1.png" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-6 col-sm-6">
                <p>
                  The first pavilion came up shortly, designed by RF Chisholm who had famously designed many of the beautiful Indo Saracenic buildings in
                  Madras. This was followed in 1892 by the “Old Irwin pavilion”- A pavilion out of the English county scene with a verandah and a manicured
                  lawn. Just above the entrance a handsome clock was positioned in February 1927. As an extension a lodge and office were built, which stands
                  even now used as the Club’s office.
                </p>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-lg-6 col-sm-6">
                <p>
                  Through the years the MCC has witnessed many changes in its premises. The MA Chidambaram (MAC) Cricket stadium was built and along with it
                  other sporting infrastructure came up to foster the spirit of sportsmanship. From Hockey to Tennis, Squash to Swimming the members are always
                  game for a healthy competition. The banquets and bars have evolved over the years keeping alive the tradition of Club culture. Along with the
                  indulgences, fitness and grooming are well taken care with modern amenities introduced over the years.
                </p>
              </div>
              <div className="col-lg-6 col-sm-6">
                <img src="/assets/images/abt-img-2.jpg" alt="" className="img-fluid" />
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-lg-6 col-sm-6">
                <img src="/assets/images/abt-img-3.jpg" alt="" className="img-fluid" />
              </div>
              <div className="col-lg-6 col-sm-6">
                <p>
                  From its earlier days the Club has set an example by conducting matches with clockwork precision and smooth efficiency. It continues to
                  conduct a prestigious all-Indian Hockey tournament which is over a hundred years old. It is the home of South Indian Squash and, boasting of
                  one of the best facilities in the country, it hosts tournaments with great success. For years the MCC Tennis tournaments provided some of the
                  best competition in that game.
                </p>
              </div>
            </div>
          </div>
          <div className="tommorw-content">
            <h4 className="text-center">The Tomorrow</h4>
            <Slider dots slidesToShow={1} slidesToScroll={1} autoplay={false} arrows autoplaySpeed={3000}>
              <div>
                <img src="/assets/images/ga-1.jpg" alt="" className="img-fluid" />
              </div>
              <div>
                <img src="/assets/images/ga-2.jpg" alt="" className="img-fluid" />
              </div>
            </Slider>
            {/* <ul id="image-gallery" className="gallery list-unstyled cS-hidden">
                        <li data-thumb="./images/ga-1.jpg"> 
                            <img src="./images/ga-1.jpg" alt="" className="img-fluid"/>
                        </li>
                        <li data-thumb="./images/ga-2.jpg"> 
                            <img src="./images/ga-2.jpg" alt="" className="img-fluid"/>
                        </li>
                    </ul> */}
            <div className="row mt-4">
              <div className="col-lg-12">
                <p>
                  A modern clubhouse is in the works as you read this, boasting of world class facilities, including six Lounge Boxes, directly above the new
                  pavilion. The first floor will have the Yorker Bar, the Bouncer restaurant and a verandah overlooking the cricket ground. The second floor is
                  to house two party halls. The Cards Room will be on the Third Floor, as will the Air Conditioned Lounge Boxes. The highest tier will have a
                  seating capacity of 1200.
                </p>
                <p>
                  The pavilion will be recessed to facilitate a lawn to revive the view of the past- you can step out of the Club on to a path of grass and see
                  Chepauk from there. This was the view many old-timers fought hard to retain in the 1960s. The sloping roof facade of the Old Irwin Pavilion,
                  with a clock in the middle, will be replicated in the first floor verandah, overlooking the Chepauk ground.
                </p>
                <p>
                  The new Sports Complex, around the swimming pool, includes dressing rooms, massage and steam rooms, two new squash courts with an open viewing
                  gallery. The upper floor includes the gymnasium, yoga and meditation rooms, and a Cricket practice facility.The kitchen and The Chambers will
                  be upgraded and refurbished, while the Library will be housed in the Ground Floor of the same building.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aboutus;
