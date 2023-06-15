import { gql } from "@apollo/client";

export const PROPERTIES_PAGE_QUERY = gql`
  query getPropertiesPageDetails {
    propertiesPage {
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
    properties(sort: "createdAt:desc") {
      data {
        id
        attributes {
          title
          description
          status
          slug
          heroImage {
            data {
              attributes {
                formats
              }
            }
          }
          futures {
            bedroom
            bathroom
            facing
            age
            property_type
            area
          }
          address {
            street
            locality
            city
            state
            latitude
            pincode
            longitude
            googleMap
          }
          brochure {
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
`;
