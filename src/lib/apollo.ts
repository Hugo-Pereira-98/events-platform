import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: 'https://api-sa-east-1.graphcms.com/v2/cl4r4cadn0lon01ywc9img0lu/master',
    cache: new InMemoryCache(),
});