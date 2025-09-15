import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
    link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_WEBINY_CMS_API,
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_WEBINY_CMS_API_KEY}`,
        },
    }),
    cache: new InMemoryCache(),
});

export default client;
