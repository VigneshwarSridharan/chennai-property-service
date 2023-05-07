import APIService from "@/lib/APIService";
import "./globals.css";
import { get } from "lodash";
import { getStrapiMedia } from "@/lib/functions";

const getData = async (config) => {
  const res = await APIService.get("/global", config);
  return res.data;
};

export const generateMetadata = async () => {
  const { data } = await getData({
    params: {
      populate: '*'
    }
  });

  return {
    title: data.attributes.defaultSeo.metaTitle,
    description: data.attributes.defaultSeo.metaTitle,
  }
};

export default async function RootLayout({ children }) {
  const { data } = await getData({
    params: {
      populate: '*'
    }
  });

  const { favicon = {}, logo = {}, defaultSeo = {} } = data?.attributes || {}
  const logoImage = get(logo, 'data.attributes.url')
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
          href="assets/vendor/bootstrap/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="assets/vendor/bootstrap-icons/bootstrap-icons.css"
          rel="stylesheet"
        />
        <link
          href="assets/vendor/fontawesome-free/css/all.min.css"
          rel="stylesheet"
        />
        <link href="assets/vendor/aos/aos.css" rel="stylesheet" />
        <link
          href="assets/vendor/glightbox/css/glightbox.min.css"
          rel="stylesheet"
        />
        <link
          href="assets/vendor/swiper/swiper-bundle.min.css"
          rel="stylesheet"
        />

        {/* <!-- Template Main CSS File --> */}
        <link href="assets/css/main.css" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning={true} >
        {/* <!-- ======= Header ======= --> */}
        <header id="header" className="header d-flex align-items-center">
          <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <a href="index.html" className="logo d-flex align-items-center">
              {/* <!-- Uncomment the line below if you also wish to use an image logo --> */}
              {logoImage ? (
                <img src={getStrapiMedia(logo)} alt={get(defaultSeo, 'metaTitle')} />
              ) : (
                <h1>
                  {get(defaultSeo, 'metaTitle')}
                </h1>
              )}

            </a>

            <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
            <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
            <nav id="navbar" className="navbar">
              <ul>
                <li>
                  <a href="index.html" className="active">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Services</a>
                </li>
                <li>
                  <a href="#">Projects</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </nav>
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
                    <h3>{get(defaultSeo, 'metaTitle')}</h3>
                    <p>
                      A108 Adam Street <br />
                      NY 535022, USA
                      <br />
                      <br />
                      <strong>Phone:</strong> +1 5589 55488 55
                      <br />
                      <strong>Email:</strong> <br />
                    </p>
                    <div className="social-links d-flex mt-3">
                      <a
                        href="#"
                        className="d-flex align-items-center justify-content-center"
                      >
                        <i className="bi bi-twitter"></i>
                      </a>
                      <a
                        href="#"
                        className="d-flex align-items-center justify-content-center"
                      >
                        <i className="bi bi-facebook"></i>
                      </a>
                      <a
                        href="#"
                        className="d-flex align-items-center justify-content-center"
                      >
                        <i className="bi bi-instagram"></i>
                      </a>
                      <a
                        href="#"
                        className="d-flex align-items-center justify-content-center"
                      >
                        <i className="bi bi-linkedin"></i>
                      </a>
                    </div>
                  </div>
                </div>
                {/* <!-- End footer info column--> */}

                <div className="col-lg-2 col-md-3 footer-links">
                  <h4>Useful Links</h4>
                  <ul>
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="#">About us</a>
                    </li>
                    <li>
                      <a href="#">Services</a>
                    </li>
                    <li>
                      <a href="#">Terms of service</a>
                    </li>
                    <li>
                      <a href="#">Privacy policy</a>
                    </li>
                  </ul>
                </div>
                {/* <!-- End footer links column--> */}

                <div className="col-lg-2 col-md-3 footer-links">
                  <h4>Our Services</h4>
                  <ul>
                    <li>
                      <a href="#">Web Design</a>
                    </li>
                    <li>
                      <a href="#">Web Development</a>
                    </li>
                    <li>
                      <a href="#">Product Management</a>
                    </li>
                    <li>
                      <a href="#">Marketing</a>
                    </li>
                    <li>
                      <a href="#">Graphic Design</a>
                    </li>
                  </ul>
                </div>
                {/* <!-- End footer links column--> */}

                <div className="col-lg-2 col-md-3 footer-links">
                  <h4>Hic solutasetp</h4>
                  <ul>
                    <li>
                      <a href="#">Molestiae accusamus iure</a>
                    </li>
                    <li>
                      <a href="#">Excepturi dignissimos</a>
                    </li>
                    <li>
                      <a href="#">Suscipit distinctio</a>
                    </li>
                    <li>
                      <a href="#">Dilecta</a>
                    </li>
                    <li>
                      <a href="#">Sit quas consectetur</a>
                    </li>
                  </ul>
                </div>
                {/* <!-- End footer links column--> */}

                <div className="col-lg-2 col-md-3 footer-links">
                  <h4>Nobis illum</h4>
                  <ul>
                    <li>
                      <a href="#">Ipsam</a>
                    </li>
                    <li>
                      <a href="#">Laudantium dolorum</a>
                    </li>
                    <li>
                      <a href="#">Dinera</a>
                    </li>
                    <li>
                      <a href="#">Trodelas</a>
                    </li>
                    <li>
                      <a href="#">Flexo</a>
                    </li>
                  </ul>
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
                  <span>{get(defaultSeo, 'metaTitle')}</span>
                </strong>
                . All Rights Reserved
              </div>
              <div className="credits">
                {/* <!-- All the links in the footer should remain intact. -->
          <!-- You can delete the links only if you purchased the pro version. -->
           */}
                Designed by{" "}
                <a href="#">Mavi Tech</a>
              </div>
            </div>
          </div>
        </footer>
        {/* <!-- End Footer --> */}
      </body>
    </html>
  );
}
