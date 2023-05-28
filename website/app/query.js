import { gql } from "@apollo/client";

export const HOME_PAGE_QUERY = gql`
  query getHomePageDetails {
    homepage {
      data {
        attributes {
          seo {
            metaTitle
            metaDescription
          }
          hero {
            title
            description
            images {
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
  }
`;

export const LATEST_ROPERTIES_QUERY = gql`
  query latestProperties(
    $sort: [String] = []
    $pagination: PaginationArg = {}
  ) {
    properties(sort: $sort, pagination: $pagination) {
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

export const GET_GLOBAL_DETAILS = gql`
  query getGlobalDetails {
    global {
      data {
        attributes {
          defaultSeo {
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
          favicon {
            data {
              attributes {
                url
              }
            }
          }
          logo {
            data {
              attributes {
                url
              }
            }
          }
          address {
            street
            locality
            city
            state
            pincode
          }
          phone
          email
          socialMedia {
            id
            icon
            link
            status
          }
          aboutUs
        }
      }
    }
    properties(sort: "createdAt:desc", pagination: { start: 0, limit: 6 }) {
      data {
        attributes {
          title
          slug
        }
      }
    }
  }
`;
