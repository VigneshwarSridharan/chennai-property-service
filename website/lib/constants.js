export const BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://chennaipropertyservice:1337";

export const API_BASE_URL = `${BASE_URL}/api`;

export const GRAPHQL_URL = `${BASE_URL}/graphql`;

// export const MEDIA_BASE_URL = "https://s5g5hd-1337.csb.app";
export const MEDIA_BASE_URL = `${BASE_URL}`
