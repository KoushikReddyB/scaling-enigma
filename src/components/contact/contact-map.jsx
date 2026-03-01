import React from 'react';

const ContactMap = () => {
  return (
    <>
      <section className="tp-map-area pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-map-wrapper">

                {/* Hotspot (kept from old code) */}
                <div className="tp-map-hotspot">
                  <span className="tp-hotspot tp-pulse-border">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="6" cy="6" r="6" fill="#821F40" />
                    </svg>
                  </span>
                </div>

                {/* Updated Poranki Map */}
                <div className="tp-map-iframe" style={{ width: "100%", height: "400px" }}>
                  <iframe
                    title="Poranki Location"
                    width="100%"
                    height="400"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src="https://maps.google.com/maps?width=1185&height=400&hl=en&q=Poranki&t=&z=11&ie=UTF8&iwloc=B&output=embed"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactMap;