import client from "@/lib/ApolloClient";
import { ABOUT_PAGE_QUERY } from "./query";
import get from "lodash/get";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { MEDIA_BASE_URL } from "@/lib/constants";

const fetchAboutPageDetails = async (variables) => {
  const response = await client.query({
    query: ABOUT_PAGE_QUERY,
    variables,
  });

  return response.data;
};

export const generateMetadata = async () => {
  const { aboutPage } = await fetchAboutPageDetails();

  return {
    title: get(aboutPage, "data.attributes.seo.metaTitle"),
    description: get(aboutPage, "data.attributes.seo.metaDescription"),
  };
};

const AboutPage = async () => {
  const { aboutPage } = await fetchAboutPageDetails();
  const title = get(aboutPage, "data.attributes.seo.metaTitle") || "About Us";
  const bgImage = get(
    aboutPage,
    "data.attributes.seo.shareImage.data.attributes.url"
  );
  return (
    <main id="main">
      <div
        className="breadcrumbs d-flex align-items-center"
        style={{ backgroundImage: `url("${MEDIA_BASE_URL}${bgImage}")` }}
      >
        <div className="container position-relative d-flex flex-column align-items-center">
          <h2>{title}</h2>
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>{title}</li>
          </ol>
        </div>
      </div>
      <section className="recent-blog-posts">
        <div className="container">
          <div className=" section-header">
            <h2>Our Company</h2>
            <p>{title}</p>
          </div>

          <div className="mb-5">
            <ReactMarkdown className="content">
              {get(aboutPage, "data.attributes.content")}
            </ReactMarkdown>
          </div>
          <div className="row alt-services">
            <div className="col-md-6">
              <h3>Mission</h3>
              <ReactMarkdown className="content">
                {get(aboutPage, "data.attributes.mission")}
              </ReactMarkdown>
            </div>
            <div className="col-md-6">
              <h3>Vision</h3>
              <ReactMarkdown className="content">
                {get(aboutPage, "data.attributes.vision")}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
