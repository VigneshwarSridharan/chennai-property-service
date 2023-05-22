import { gql } from "@apollo/client";

export const CREATE_ENQUIRY_MUTATION = gql`
  mutation createEnquiry($data: EnquiryInput!) {
    createEnquiry(data: $data) {
      data {
        id
        attributes {
          name
          emailAddress
          message
          mobileNumber
          createdAt
        }
      }
    }
  }
`;
