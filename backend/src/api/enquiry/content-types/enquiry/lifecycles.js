var template = require("./welcome.js");
module.exports = {
  async afterCreate(event) {
    const { result, params } = event;

    await strapi.plugins["email"].services.email.sendTemplatedEmail(
      {
        to: event.params.data.emailAddress,
      },
      {
        subject: "Enquiry",
        text: "",
        html: template,
      },
      params.data
    );

    // do something to the result;
  },
};
