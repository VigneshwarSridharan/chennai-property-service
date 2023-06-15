import { gql } from "@apollo/client";

export const ABOUT_PAGE_QUERY = gql`
  query getAboutPageDetails {
    aboutPage {
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
          content
          mission
          vision
        }
      }
    }
  }
`;
