import APIService from "@/lib/APIService";
import { MEDIA_BASE_URL } from "@/lib/constants";
import { getStrapiMedia } from "@/lib/functions";
import { get } from "lodash";
import ReactMarkdown from "react-markdown";
import EMICalculator from "./EMICalculator";
import GetInTouchForm from "./GetInTouchForm";
import MainSection from "./MainSection";

export const revalidate = 0;

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
      populate: "*",
    },
  });
  const metaTags = get(property, "attributes.metaTags") || [];
  const metaTagsObj = metaTags.reduce((final, item) => {
    final[item.name] = item.content;
    return final;
  }, {});
  console.log("metaTagsObj", metaTagsObj);
  return metaTagsObj;
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

  const fullAddress = [
    get(propertyDetails, "address.street", ""),
    get(propertyDetails, "address.locality", ""),
    get(propertyDetails, "address.city", ""),
    get(propertyDetails, "address.state", ""),
    get(propertyDetails, "address.pincode", ""),
  ]
    .filter((i) => !!i)
    .join(", ");

  const latitude = get(propertyDetails, "address.latitude");
  const longitude = get(propertyDetails, "address.longitude");
  const googleMap = get(propertyDetails, "address.googleMap");

  const metaData = [
    {
      icon: "bi bi-geo-alt",
      label: "Address",
      value: fullAddress,
    },
    {
      icon: "bi bi-house",
      label: "Bedrooms",
      value: get(propertyDetails, "futures.bedroom", "") + " BHK",
    },
    {
      icon: "bi bi-droplet-half",
      label: "Bathroom",
      value: get(propertyDetails, "futures.bathroom", "")
        ? get(propertyDetails, "futures.bathroom", "") + " Bathrooms"
        : "",
    },
    {
      icon: "bi bi-sunrise",
      label: "Facing",
      value: get(propertyDetails, "futures.facing"),
    },
    {
      icon: "bi bi-bounding-box-circles",
      label: "Area",
      value: get(propertyDetails, "futures.area"),
    },
    {
      icon: "bi bi-check-circle",
      label: "Age",
      value: get(propertyDetails, "futures.age"),
    },
    {
      icon: "bi bi-check-circle",
      label: "Property Type",
      value: get(propertyDetails, "futures.property_type"),
    },
  ].filter((item) => !!item.value);

  const brochureLink =
    get(propertyDetails, "brochure.data.attributes.url") || "";

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

      <MainSection {...{ propertyDetails, metaData, brochureLink }} />

      <section id="blog" className="blog section-bg">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8">
              <article className="blog-details mb-3 bg-white">
                <h2 className="title">Property Information</h2>

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
              <article className="blog-details bg-white">
                <h2 className="title mb-3">Location</h2>
                <div
                  style={{ width: "100%" }}
                  className="property-google-map"
                  dangerouslySetInnerHTML={{ __html: googleMap }}
                ></div>
              </article>
            </div>
            <div className="col-lg-4">
              <GetInTouchForm />
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
