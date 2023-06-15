import { Fragment } from "react";
import Link from "next/link";
import { get } from "lodash";
import { MEDIA_BASE_URL } from "@/lib/constants";

const PropertiesList = ({ properties }) => {
  return (
    <div className="row gy-5">
      {properties.map((property) => {
        const metaData = [
          {
            icon: "bi bi-geo-alt",
            text: [
              get(property, "attributes.address.locality", ""),
              get(property, "attributes.address.city", ""),
            ].join(", "),
          },
          {
            icon: "bi bi-house",
            text: get(property, "attributes.futures.bedroom") + " BHK",
          },
          {
            icon: "bi bi-bounding-box-circles",
            text: get(property, "attributes.futures.area"),
          },
        ];
        return (
          <div className="col-xl-4 col-md-6" key={property.id}>
            <div className="post-item position-relative h-100">
              <div className="post-img position-relative overflow-hidden">
                <img
                  src={`${MEDIA_BASE_URL}${get(
                    property,
                    "attributes.heroImage.data.attributes.formats.medium.url"
                  )}`}
                  className="img-fluid"
                  alt=""
                />
                <span className="post-date text-capitalize">
                  {(get(property, "attributes.status") || "")
                    .replace(/_/g, " ")
                    .toLowerCase()}
                </span>
              </div>

              <div className="post-content d-flex flex-column">
                <h3 className="post-title">
                  {get(property, "attributes.title")}
                </h3>
                <div className="meta d-flex align-items-center flex-wrap">
                  {metaData.map((meta, inx) => {
                    return (
                      <Fragment key={`${property.id}-${inx}`}>
                        {!!inx && <span className="px-3 text-black-50">|</span>}
                        <div className="d-flex align-items-center">
                          <i className={meta.icon}></i>{" "}
                          <span className="ps-2">{meta.text}</span>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
                <hr />
                <Link
                  href={`/property/${get(property, "attributes.slug")}`}
                  className="readmore stretched-link"
                >
                  <span>Read More</span>
                  <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PropertiesList;
