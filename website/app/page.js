import { Fragment } from "react";
import APIService from "@/lib/APIService";
import { get } from "lodash";
import { MEDIA_BASE_URL } from "@/lib/constants";
import Link from "next/link";

const getData = async (config) => {
  const res = await APIService.get("/homepage", config);
  return res.data;
};

const fetchProperties = async (config) => {
  const res = await APIService.get("/properties", config);
  return get(res, "data.data") || [];
};

export const generateMetadata = async () => {
  const { data } = await getData({
    params: {
      populate: {
        seo: { populate: "*" },
      },
    },
  });
  return {
    title: data.attributes.seo.metaTitle,
    description: data.attributes.seo.metaTitle,
  };
};

export default async function Home() {
  const res = await getData();
  const properties = await fetchProperties({
    params: {
      fields: [
        "title",
        "description",
        "status",
        "slug",
        "heroImage",
        "futures",
        "address",
      ],
      populate: {
        brochure: {
          fields: ["url"],
        },
        futures: "*",
        address: "*",
        heroImage: {
          fields: ["formats"],
        },
      },
    },
  });

  return (
    <>
      {/* <!-- ======= Hero Section ======= --> */}
      <section id="hero" className="hero">
        <div className="info d-flex align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center">
                <h2>
                  Welcome to <span>Chennai Property Service</span>
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <a href="#get-started" className="btn-get-started">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          id="hero-carousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="5000"
        >
          <div
            className="carousel-item active"
            style={{
              backgroundImage:
                "url(assets/img/hero-carousel/hero-carousel-1.jpg)",
            }}
          ></div>
          <div
            className="carousel-item"
            style={{
              backgroundImage:
                "url(assets/img/hero-carousel/hero-carousel-2.jpg)",
            }}
          ></div>
          <div
            className="carousel-item"
            style={{
              backgroundImage:
                "url(assets/img/hero-carousel/hero-carousel-3.jpg)",
            }}
          ></div>
          <div
            className="carousel-item"
            style={{
              backgroundImage:
                "url(assets/img/hero-carousel/hero-carousel-4.jpg)",
            }}
          ></div>
          <div
            className="carousel-item"
            style={{
              backgroundImage:
                "url(assets/img/hero-carousel/hero-carousel-5.jpg)",
            }}
          ></div>

          <a
            className="carousel-control-prev"
            href="#hero-carousel"
            role="button"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon bi bi-chevron-left"
              aria-hidden="true"
            ></span>
          </a>

          <a
            className="carousel-control-next"
            href="#hero-carousel"
            role="button"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon bi bi-chevron-right"
              aria-hidden="true"
            ></span>
          </a>
        </div>
      </section>
      {/* <!-- End Hero Section --> */}

      <main id="main">
        {/* <!-- ======= Recent Blog Posts Section ======= --> */}
        <section id="recent-blog-posts" className="recent-blog-posts">
          <div className="container">
            <div className=" section-header">
              <h2>Properties</h2>
              <p>Our Projects</p>
            </div>

            <div className="row gy-5">
              {properties.map((property) => {
                const metaData = [
                  {
                    icon: "bi bi-geo-alt",
                    text: [
                      get(property, "attributes.address.locality", ""),
                      get(property, "attributes.address.city", ""),
                    ].join(", "),
                  },
                  {
                    icon: "bi bi-house",
                    text: get(property, "attributes.futures.bedroom") + " BHK",
                  },
                  {
                    icon: "bi bi-bounding-box-circles",
                    text: get(property, "attributes.futures.area"),
                  },
                ];
                return (
                  <div className="col-xl-4 col-md-6" key={property.id}>
                    <div className="post-item position-relative h-100">
                      <div className="post-img position-relative overflow-hidden">
                        <img
                          src={`${MEDIA_BASE_URL}${get(
                            property,
                            "attributes.heroImage.data.attributes.formats.medium.url"
                          )}`}
                          className="img-fluid"
                          alt=""
                        />
                        <span className="post-date text-capitalize">
                          {get(property, "attributes.status", "")
                            .replace(/_/g, " ")
                            .toLowerCase()}
                        </span>
                      </div>

                      <div className="post-content d-flex flex-column">
                        <h3 className="post-title">
                          {get(property, "attributes.title")}
                        </h3>
                        <div className="meta d-flex align-items-center flex-wrap">
                          {metaData.map((meta, inx) => {
                            return (
                              <Fragment key={`${property.id}-${inx}`}>
                                {!!inx && (
                                  <span className="px-3 text-black-50">|</span>
                                )}
                                <div className="d-flex align-items-center">
                                  <i className={meta.icon}></i>{" "}
                                  <span className="ps-2">{meta.text}</span>
                                </div>
                              </Fragment>
                            );
                          })}
                        </div>
                        <hr />
                        <Link
                          href={`/property/${get(property, "attributes.slug")}`}
                          className="readmore stretched-link"
                        >
                          <span>Read More</span>
                          <i className="bi bi-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
