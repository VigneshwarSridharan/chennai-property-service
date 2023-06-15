import APIService from "@/lib/APIService";
import { get } from "lodash";
import { getStrapiMedia } from "@/lib/functions";
import MainNavigation from "./_components/MainNavigation";
import client from "@/lib/ApolloClient";
import { GET_GLOBAL_DETAILS } from "./query";
import Link from "next/link";

export const revalidate = 0;

const fetchGlobalDetails = async (config) => {
  const response = await client.query({
    query: GET_GLOBAL_DETAILS,
  });
  return response.data;
};

export const generateMetadata = async () => {
  const { global } = await fetchGlobalDetails({
    params: {
      populate: "*",
    },
  });

  return {
    title: get(global, "data.attributes.defaultSeo.metaTitle"),
    description: get(global, "data.attributes.defaultSeo.metaDescription"),
  };
};

export default async function RootLayout({ children }) {
  const { global, properties } = await fetchGlobalDetails();
  const { data } = global;

  const { favicon = {}, logo = {}, defaultSeo = {} } = data?.attributes || {};
  const logoImage = get(logo, "data.attributes.url");
  const address = get(data, "attributes.address") || {};
  const phone = get(data, "attributes.phone") || "";
  const email = get(data, "attributes.email") || "";
  const socialMedia = get(data, "attributes.socialMedia") || [];
  const aboutUs = get(data, "attributes.aboutUs");
  return (
    <html lang="en">
      <head>
        {/* <!-- favicon icon --> */}
        <link rel="icon" href={getStrapiMedia(favicon)} type="image/x-icon" />

        {/* <!-- Google Fonts --> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={"anonymous"}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600;1,700&family=Roboto:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Work+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />

        {/* <!-- Vendor CSS Files --> */}
        <link
          href="/assets/vendor/bootstrap/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="/assets/vendor/bootstrap-icons/bootstrap-icons.css"
          rel="stylesheet"
        />
        <link
          href="/assets/vendor/fontawesome-free/css/all.min.css"
          rel="stylesheet"
        />
        <link href="/assets/vendor/aos/aos.css" rel="stylesheet" />
        <link
          href="/assets/vendor/glightbox/css/glightbox.min.css"
          rel="stylesheet"
        />
        <link
          href="/assets/vendor/swiper/swiper-bundle.min.css"
          rel="stylesheet"
        />

        {/* <!-- Template Main CSS File --> */}
        <link href="/assets/css/main.css" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning={true}>
        {/* <!-- ======= Header ======= --> */}
        <header id="header" className="header d-flex align-items-center">
          <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <Link href="/" className="logo d-flex align-items-center">
              {/* <!-- Uncomment the line below if you also wish to use an image logo --> */}
              {logoImage ? (
                <img
                  src={getStrapiMedia(logo)}
                  alt={get(defaultSeo, "metaTitle")}
                />
              ) : (
                <h1>{get(defaultSeo, "metaTitle")}</h1>
              )}
            </Link>

            <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
            <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
            <MainNavigation />

            {/* <!-- .navbar --> */}
          </div>
        </header>
        {/* <!-- End Header --> */}
        {children}

        {/* <!-- ======= Footer ======= --> */}
        <footer id="footer" className="footer">
          <div className="footer-content position-relative">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="footer-info">
                    {logoImage ? (
                      <img
                        width="100"
                        src={getStrapiMedia(logo)}
                        alt={get(defaultSeo, "metaTitle")}
                      />
                    ) : (
                      <h1>{get(defaultSeo, "metaTitle")}</h1>
                    )}

                    <p className="mt-3">
                      {address.street}, {address.locality}, <br />{" "}
                      {address.city}, {address.state}, {address.pincode}
                      <br />
                      <br />
                      <strong>Phone:</strong>{" "}
                      <a href={`tel:${phone}`}>{phone}</a>
                      <br />
                      <strong>Email:</strong>{" "}
                      <a href={`mailto:${email}`}>{email}</a> <br />
                    </p>
                    <div className="social-links d-flex mt-3">
                      {socialMedia
                        .filter((item) => item.status)
                        .map((item) => {
                          return (
                            <a
                              href={item.link}
                              className="d-flex align-items-center justify-content-center"
                              key={item.id}
                            >
                              <i className={item.icon}></i>
                            </a>
                          );
                        })}
                    </div>
                  </div>
                </div>
                {/* <!-- End footer info column--> */}

                <div className="col-lg-2 col-md-3 footer-links">
                  <h4>Useful Links</h4>
                  <ul>
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      <Link href="/about">About us</Link>
                    </li>

                    <li>
                      <Link href="/properties">Properties</Link>
                    </li>
                    <li>
                      <Link href="/contact">Contact</Link>
                    </li>
                  </ul>
                </div>
                {/* <!-- End footer links column--> */}

                <div className="col-lg-2 col-md-3 footer-links">
                  <h4>Latest Properties</h4>
                  <ul>
                    {(get(properties, "data") || []).map((item, inx) => {
                      return (
                        <li key={inx}>
                          <a href={`/property/${get(item, "attributes.slug")}`}>
                            {get(item, "attributes.title")}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                {/* <!-- End footer links column--> */}

                <div className="col-lg-4 col-md-6">
                  <h4>About Us</h4>
                  <div>{aboutUs}</div>
                </div>
                {/* <!-- End footer links column--> */}
              </div>
            </div>
          </div>

          <div className="footer-legal text-center position-relative">
            <div className="container">
              <div className="copyright">
                &copy; Copyright{" "}
                <strong>
                  <span>{get(defaultSeo, "metaTitle")}</span>
                </strong>
                . All Rights Reserved
              </div>
            </div>
          </div>
        </footer>
        {/* <!-- End Footer --> */}
      </body>
    </html>
  );
}
