import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://limitless-sierra-35695.herokuapp.com/collection',
  cache: new InMemoryCache(),
})

export default client
