"use client";
import { useMutation } from "@apollo/client";
import client from "@/lib/ApolloClient";
import { CREATE_ENQUIRY_MUTATION, CONTACT_PAGE_QUERY } from "./query";

const ContactForm = () => {
  const [createEnquiry, createEnquiryParamas] = useMutation(
    CREATE_ENQUIRY_MUTATION,
    { client }
  );

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    var formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const mobileNumber = formData.get("mobileNumber");
    const message = formData.get("message");
    const response = await createEnquiry({
      variables: {
        data: {
          name: name,
          emailAddress: email,
          mobileNumber: mobileNumber,
          message: message,
        },
      },
    });
    e.target.reset();
  };
  return (
    <form role="form" className="php-email-form" onSubmit={handleOnSubmit}>
      <div className="row gy-4">
        <div className="col-lg-6 form-group">
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="col-lg-6 form-group">
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            placeholder="Your Email"
            required
          />
        </div>
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          name="mobileNumber"
          id="mobileNumber"
          placeholder="Mobile Number"
          required
        />
      </div>
      <div className="form-group">
        <textarea
          className="form-control"
          name="message"
          rows="5"
          placeholder="Message"
          required
        ></textarea>
      </div>
      <div className="my-3">
        <div className="loading">Loading</div>
        <div className="error-message"></div>
        <div className="sent-message">
          Your message has been sent. Thank you!
        </div>
      </div>
      <div className="text-center mb-3">
        <button type="submit" disabled={createEnquiryParamas.loading}>
          Send Message
        </button>
      </div>
      {createEnquiryParamas.loading && (
        <div className="alert alert-info">
          <div class="spinner-border spinner-border-sm me-2" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          Processing, Please wait
        </div>
      )}
      {createEnquiryParamas.called &&
        !createEnquiryParamas.loading &&
        createEnquiryParamas.error && (
          <div className="alert alert-danger">
            Something went wrong, Please try again
          </div>
        )}
      {createEnquiryParamas.called &&
        !createEnquiryParamas.loading &&
        !createEnquiryParamas.error && (
          <div className="alert alert-success">
            Thanks for contacting us, We will be in touch with you shortly
          </div>
        )}
    </form>
  );
};

export default ContactForm;
