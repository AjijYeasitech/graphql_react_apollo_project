import { createHttpLink } from "apollo-link-http";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const httpLink = new createHttpLink({
  uri: "http://localhost:4000",
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
