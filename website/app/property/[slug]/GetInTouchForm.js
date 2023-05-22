"use client";
import { useMutation } from "@apollo/client";
import client from "@/lib/ApolloClient";
import { CREATE_ENQUIRY_MUTATION } from "@/lib/queries";

const GetInTouchForm = () => {
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
    <div className="get-started mb-4">
      <form className="php-email-form" onSubmit={handleOnSubmit}>
        <h3>Get in Touch</h3>
        <p>Get in Touch with us, we would be more than happy to help</p>
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
              name="mobileNumber"
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
            <div className="text-center mb-3">
              <button type="submit" disabled={createEnquiryParamas.loading}>
                Send Message
              </button>
            </div>
            {createEnquiryParamas.loading && (
              <div className="alert alert-info">
                <div
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                >
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
          </div>
        </div>
      </form>
    </div>
  );
};

export default GetInTouchForm;
