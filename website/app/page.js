import { Fragment } from "react";
import APIService from "@/lib/APIService";
import { get } from "lodash";
import { MEDIA_BASE_URL } from "@/lib/constants";
import Link from "next/link";
import Hero from "./_components/Hero";
import client from "@/lib/ApolloClient";
import PropertiesList from "@/components/PropertiesList";
import { HOME_PAGE_QUERY, LATEST_ROPERTIES_QUERY } from "./query";

const getData = async (config) => {
  const response = await client.query({
    query: HOME_PAGE_QUERY,
  });

  return response.data.homepage;
};

const fetchProperties = async (variables) => {
  // const res = await APIService.get("/properties", config);
  const response = await client.query({
    query: LATEST_ROPERTIES_QUERY,
    variables,
    fetchPolicy: "no-cache",
  });
  return get(response, "data.properties.data") || [];
};

export const generateMetadata = async () => {
  const { data } = await getData({
    params: {
      populate: {
        seo: { populate: "*" },
      },
    },
  });
  return {
    title: data.attributes.seo.metaTitle,
    description: data.attributes.seo.metaDescription,
  };
};

export default async function Home() {
  const res = await getData({
    params: {
      populate: "*",
    },
  });

  const properties = await fetchProperties({
    sort: "createdAt:desc",
    pagination: { start: 0, limit: 6 },
  });

  return (
    <>
      {/* <!-- ======= Hero Section ======= --> */}
      <Hero hero={get(res, "data.attributes.hero")} />
      {/* <!-- End Hero Section --> */}

      <main id="main">
        {/* <!-- ======= Recent Blog Posts Section ======= --> */}
        <section id="properties" className="recent-blog-posts">
          <div className="container">
            <div className=" section-header">
              <h2>Properties</h2>
              <p>Our Projects</p>
            </div>

            <PropertiesList properties={properties} />
            <div className="mt-3 text-center">
              <Link href="/properties" className="btn-site">
                View More Properties{" "}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
