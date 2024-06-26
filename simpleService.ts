import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
    type Query {
        users: [String!]!
    },
    type Mutation {
        createUser(name: String!): String!
    }
`;
const users: string[] = [];
const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query: {
            users: () => {
                return users;
            }
        },
        Mutation: {
            createUser: (parents, args:{name: string}) => {
                users.push(args.name)
                return args.name
            }
        }

    }
});
server.listen().then(({url}) => {
    console.log(`http server runnig on ${url}`)
})