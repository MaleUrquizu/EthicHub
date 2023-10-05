import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';


const subgraph1Link = new HttpLink({
  uri: 'https://api.thegraph.com/subgraphs/name/ethichub/ethichub',
});

const subgraph2Link = new HttpLink({
  uri: 'https://api.thegraph.com/subgraphs/name/ethichub/ethichub-celo',
});

const client = new ApolloClient({
  link: subgraph1Link,
  cache: new InMemoryCache(),
});

const client2 = new ApolloClient({
  link: subgraph2Link,
  cache: new InMemoryCache(),
});

export { client, client2, subgraph1Link, subgraph2Link };
