import client from "@/lib/ApolloClient";
import { PROPERTIES_PAGE_QUERY } from "./query";
import get from "lodash/get";
import Link from "next/link";
import { MEDIA_BASE_URL } from "@/lib/constants";
import PropertiesList from "@/components/PropertiesList";

export const revalidate = 0;

const fetchPropertiesPageDetails = async (variables) => {
  const response = await client.query({
    query: PROPERTIES_PAGE_QUERY,
    variables,
  });

  return response.data;
};

export const generateMetadata = async () => {
  const { propertiesPage } = await fetchPropertiesPageDetails();

  return {
    title: get(propertiesPage, "data.attributes.seo.metaTitle"),
    description: get(propertiesPage, "data.attributes.seo.metaDescription"),
  };
};

const PropertiesPage = async () => {
  const { propertiesPage, properties } = await fetchPropertiesPageDetails();
  const propertiesDetails = get(propertiesPage, "data.attributes.seo");
  const title = get(propertiesDetails, "metaTitle") || "Properties";
  const bgImage = get(propertiesDetails, "shareImage.data.attributes.url");
  return (
    <main id="main">
      {/* <!-- ======= Breadcrumbs ======= --> */}
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

      <section id="properties" className="recent-blog-posts">
        <div className="container">
          <div className=" section-header">
            <h2>Properties</h2>
            <p>Our Projects</p>
          </div>

          <PropertiesList properties={get(properties, "data")} />
        </div>
      </section>
    </main>
  );
};

export default PropertiesPage;
