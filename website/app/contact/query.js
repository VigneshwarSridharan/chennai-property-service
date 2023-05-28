import { gql } from "@apollo/client";

export const CONTACT_PAGE_QUERY = gql`
  query getContactPage {
    contact {
      data {
        attributes {
          seo {
            metaTitle
            metaDescription
            shareImage {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
    global {
      data {
        attributes {
          email
          phone
          address {
            street
            locality
            city
            state
            pincode
            latitude
            longitude
          }
        }
      }
    }
  }
`;

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
