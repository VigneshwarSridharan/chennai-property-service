import APIService from "@/lib/APIService";
import { MEDIA_BASE_URL } from "@/lib/constants";
import { getStrapiMedia } from "@/lib/functions";
import { get } from "lodash";
import ReactMarkdown from "react-markdown";
import EMICalculator from "./EMICalculator";

const fetchPropery = async (config) => {
  const res = await APIService.get("/properties", config);
  return get(res, "data.data") || [];
};

export const generateMetadata = async ({ params }) => {
  const { slug = "" } = params || {};
  const [property] = await fetchPropery({
    params: {
      filters: {
        slug: { $eq: slug },
      },
    },
  });
  return {
    title: get(property, "attributes.title"),
    description: get(property, "attributes.description"),
  };
};

const Page = async ({ params }) => {
  const { slug = "" } = params || {};
  const [property] = await fetchPropery({
    params: {
      filters: {
        slug: { $eq: slug },
      },
      populate: "*",
    },
  });
  const propertyDetails = get(property, "attributes");

  const metaData = [
    {
      icon: "bi bi-geo-alt",
      label: "Address",
      value: [
        get(propertyDetails, "address.locality", ""),
        get(property, "attributes.address.city", ""),
      ].join(", "),
    },
    {
      icon: "bi bi-house",
      label: "Bedrooms",
      value: get(propertyDetails, "futures.bedroom") + " BHK",
    },
    {
      icon: "bi bi-bounding-box-circles",
      label: "Area",
      value: get(propertyDetails, "futures.area"),
    },
  ];

  return (
    <>
      <main id="main">
        <div
          className="breadcrumbs d-flex align-items-center"
          style={{
            backgroundImage: `url(${
              getStrapiMedia(get(propertyDetails, "heroImage")) ||
              "/assets/img/breadcrumbs-bg.jpg"
            })`,
          }}
        >
          <div className="container position-relative d-flex flex-column align-items-center">
            <h2>{get(propertyDetails, "title")}</h2>
            <ol>
              <li>
                {get(propertyDetails, "address.locality")},{" "}
                {get(propertyDetails, "address.city")}
              </li>
            </ol>
          </div>
        </div>
      </main>

      <section id="stats-counter" className="stats-counter section-bg">
        <div className="container">
          <div className="row gy-4">
            {metaData.map((item, inx) => {
              return (
                <div className="col-lg-3 col-md-6" key={inx}>
                  <div className="stats-item d-flex align-items-center w-100 h-100">
                    <i className={`${item.icon} color-blue flex-shrink-0`}></i>
                    <div>
                      <span className="purecounter">{item.label}</span>
                      <p>{item.value}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="blog" className="blog section-bg">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8">
              <article className="blog-details">
                <div className="post-img">
                  <img
                    src={getStrapiMedia(get(propertyDetails, "heroImage"))}
                    alt=""
                    className="img-fluid"
                  />
                </div>

                <h2 className="title">{get(propertyDetails, "description")}</h2>

                <div className="meta-top">
                  <ul>
                    {metaData.map((item, inx) => {
                      return (
                        <li className="d-flex align-items-center" key={inx}>
                          <i className={item.icon}></i>
                          {item.value}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <ReactMarkdown className="content">
                  {get(propertyDetails, "content")}
                </ReactMarkdown>
              </article>
            </div>
            <div className="col-lg-4">
              <div className="get-started mb-4">
                <form className="php-email-form">
                  <h3>Get a quote</h3>
                  <p>
                    Get in Touch with us, we would be more than happy to help
                  </p>
                  <div className="row gy-3">
                    <div className="col-md-12">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        required
                      />
                    </div>

                    <div className="col-md-12 ">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        required
                      />
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        placeholder="Phone"
                        required
                      />
                    </div>

                    <div className="col-md-12">
                      <textarea
                        className="form-control"
                        name="message"
                        rows="6"
                        placeholder="Message"
                        required
                      ></textarea>
                    </div>

                    <div className="col-md-12 text-center">
                      <div className="loading">Loading</div>
                      <div className="error-message"></div>
                      <div className="sent-message">
                        Your quote request has been sent successfully. Thank
                        you!
                      </div>

                      <button type="submit">Get a quote</button>
                    </div>
                  </div>
                </form>
              </div>
              <EMICalculator />
            </div>
          </div>
        </div>
      </section>
      <section id="projects" className="projects">
        <div className="container">
          <div className="section-header">
            <h2>ELEVATION VIEW</h2>
          </div>

          <div className="portfolio-isotope">
            <div className="row gy-4 portfolio-container">
              {(get(propertyDetails, "images.data") || []).map((media) => {
                return (
                  <div
                    className="col-lg-4 col-md-6 portfolio-item filter-remodeling"
                    key={media.id}
                  >
                    <div className="portfolio-content h-100">
                      <img
                        src={`${MEDIA_BASE_URL}${get(media, "attributes.url")}`}
                        className="img-fluid"
                        alt=""
                      />
                      <div className="portfolio-info">
                        {/* <h4>Remodeling 1</h4>
                                            <p>Lorem ipsum, dolor sit amet consectetur</p> */}
                        <a
                          href={`${MEDIA_BASE_URL}${get(
                            media,
                            "attributes.url"
                          )}`}
                          title="Remodeling 1"
                          data-gallery="portfolio-gallery-remodeling"
                          className="glightbox preview-link"
                        >
                          <i className="bi bi-zoom-in"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
