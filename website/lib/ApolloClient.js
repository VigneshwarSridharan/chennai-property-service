import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GRAPHQL_URL } from "./constants";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
  defaultOptions,
});

export default client;
