import client from "@/lib/ApolloClient";
import { CONTACT_PAGE_QUERY } from "./query";
import get from "lodash/get";
import ContactForm from "./ContactForm";

const getData = async () => {
  const response = await client.query({
    query: CONTACT_PAGE_QUERY,
  });

  return response.data;
};

const Page = async () => {
  const response = await getData();
  const address = get(response, "global.data.attributes.address") || {};
  const email = get(response, "global.data.attributes.email");
  const phone = get(response, "global.data.attributes.phone");
  const { street, locality, city, state, pincode, latitude, longitude } =
    address;
  return (
    <>
      <main id="main">
        {/* <!-- ======= Breadcrumbs ======= --> */}
        <div
          className="breadcrumbs d-flex align-items-center"
          style={{ backgroundImage: `url('assets/img/breadcrumbs-bg.jpg')` }}
        >
          <div className="container position-relative d-flex flex-column align-items-center">
            <h2>Contact</h2>
            <ol>
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>Contact</li>
            </ol>
          </div>
        </div>

        <section id="contact" className="contact">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-6">
                <div className="info-item  d-flex flex-column justify-content-center align-items-center">
                  <i className="bi bi-map"></i>
                  <h3>Our Address</h3>
                  <p>{[street, locality, city, state, pincode].join(", ")}</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="info-item d-flex flex-column justify-content-center align-items-center">
                  <i className="bi bi-envelope"></i>
                  <h3>Email Us</h3>
                  <p>
                    <a href={`mailto:${email}`}>{email}</a>
                  </p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="info-item  d-flex flex-column justify-content-center align-items-center">
                  <i className="bi bi-telephone"></i>
                  <h3>Call Us</h3>
                  <p>
                    <a href={`tel:${phone}`}>{phone}</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="row gy-4 mt-1">
              <div className="col-lg-6 ">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15544.73478898629!2d80.20207241953865!3d13.087541552910853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5264217ba8e05f%3A0xaefd84a9264f65b6!2sAnna%20Nagar%20Ayyappa%20Temple!5e0!3m2!1sen!2sin!4v1612014802330!5m2!1sen!2sin"
                  frameborder="0"
                  style={{
                    border: 0,
                    width: "100%",
                    height: "384px",
                  }}
                  allowfullscreen
                />
              </div>

              <div className="col-lg-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
