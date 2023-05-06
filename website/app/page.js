import Image from "next/image";
import styles from "./page.module.css";
import APIService from "../lib/APIService";

const getData = async () => {
  const res = await APIService.get("/todos/1");
  console.log("getData", res.data);
  return res.data;
};

export default async function Home() {
  const res = await getData();
  console.log("Home", res);
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
              <h2>Recent Blog Posts</h2>
              <p>
                In commodi voluptatem excepturi quaerat nihil error autem
                voluptate ut et officia consequuntu
              </p>
            </div>

            <div className="row gy-5">
              <div className="col-xl-4 col-md-6">
                <div className="post-item position-relative h-100">
                  <div className="post-img position-relative overflow-hidden">
                    <img
                      src="assets/img/blog/blog-1.jpg"
                      className="img-fluid"
                      alt=""
                    />
                    <span className="post-date">December 12</span>
                  </div>

                  <div className="post-content d-flex flex-column">
                    <h3 className="post-title">
                      Eum ad dolor et. Autem aut fugiat debitis
                    </h3>

                    <div className="meta d-flex align-items-center">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-person"></i>{" "}
                        <span className="ps-2">Julia Parker</span>
                      </div>
                      <span className="px-3 text-black-50">/</span>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-folder2"></i>{" "}
                        <span className="ps-2">Politics</span>
                      </div>
                    </div>

                    <hr />

                    <a
                      href="blog-details.html"
                      className="readmore stretched-link"
                    >
                      <span>Read More</span>
                      <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              {/* <!-- End post item --> */}

              <div className="col-xl-4 col-md-6">
                <div className="post-item position-relative h-100">
                  <div className="post-img position-relative overflow-hidden">
                    <img
                      src="assets/img/blog/blog-2.jpg"
                      className="img-fluid"
                      alt=""
                    />
                    <span className="post-date">July 17</span>
                  </div>

                  <div className="post-content d-flex flex-column">
                    <h3 className="post-title">
                      Et repellendus molestiae qui est sed omnis
                    </h3>

                    <div className="meta d-flex align-items-center">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-person"></i>{" "}
                        <span className="ps-2">Mario Douglas</span>
                      </div>
                      <span className="px-3 text-black-50">/</span>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-folder2"></i>{" "}
                        <span className="ps-2">Sports</span>
                      </div>
                    </div>

                    <hr />

                    <a
                      href="blog-details.html"
                      className="readmore stretched-link"
                    >
                      <span>Read More</span>
                      <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              {/* <!-- End post item --> */}

              <div className="col-xl-4 col-md-6">
                <div className="post-item position-relative h-100">
                  <div className="post-img position-relative overflow-hidden">
                    <img
                      src="assets/img/blog/blog-3.jpg"
                      className="img-fluid"
                      alt=""
                    />
                    <span className="post-date">September 05</span>
                  </div>

                  <div className="post-content d-flex flex-column">
                    <h3 className="post-title">
                      Quia assumenda est et veritati tirana ploder
                    </h3>

                    <div className="meta d-flex align-items-center">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-person"></i>{" "}
                        <span className="ps-2">Lisa Hunter</span>
                      </div>
                      <span className="px-3 text-black-50">/</span>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-folder2"></i>{" "}
                        <span className="ps-2">Economics</span>
                      </div>
                    </div>

                    <hr />

                    <a
                      href="blog-details.html"
                      className="readmore stretched-link"
                    >
                      <span>Read More</span>
                      <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              {/* <!-- End post item --> */}
            </div>
          </div>
        </section>
        {/* <!-- End Recent Blog Posts Section --> */}
      </main>
    </>
  );
}
