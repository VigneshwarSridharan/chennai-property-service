import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GRAPHQL_URL } from "./constants";

console.log("GRAPHQL_URL", GRAPHQL_URL);

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export default client;
