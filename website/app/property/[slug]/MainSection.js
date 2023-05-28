"use client";
import { getStrapiMedia } from "@/lib/functions";
import { get } from "lodash";

const MainSection = ({ propertyDetails, metaData, brochureLink }) => {
  return (
    <section id="alt-services" className="alt-services">
      <div className="container">
        <div className="row justify-content-around gy-4">
          <div
            className="col-lg-6 img-bg"
            style={{
              backgroundImage: `url(${getStrapiMedia(
                get(propertyDetails, "heroImage")
              )})`,
            }}
          ></div>

          <div className="col-lg-5 d-flex flex-column justify-content-center">
            <h3>{get(propertyDetails, "title")}</h3>
            <p>{get(propertyDetails, "description")}</p>

            {!!brochureLink && (
              <div className="icon-box d-flex position-relative">
                <i className={`bi bi-download flex-shrink-0`}></i>
                <div>
                  <h4>
                    <a href={brochureLink} download className="stretched-link">
                      Brochure
                    </a>
                  </h4>
                  <p>Download brochure</p>
                </div>
              </div>
            )}
            {metaData.map((item, inx) => {
              return (
                <div className="icon-box d-flex position-relative" key={inx}>
                  <i className={`${item.icon} flex-shrink-0`}></i>
                  <div>
                    <h4>
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="stretched-link"
                      >
                        {item.label}
                      </a>
                    </h4>
                    <p>{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
