import { gql } from "@apollo/client";

export const CONTACT_PAGE_QUERY = gql`
  query getContactPage {
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
