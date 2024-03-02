const {
  ApolloServer,
  gql,
  MockList
} = require("apollo-server");

// create schema
// gql : schema string turn into abstract syntax tree(AST)
// scalar Date   --> semantic meaning: custmomize container for xxx value
const typeDefs = gql`
scalar Date   
scalar Email
"""
  Documentation
  an object that describes the characteristics of GQLDAY  
"""
type GqlDay {
  "A gqlDay unique identifier"
  id: ID!
  "date identifier"
  date: Date!
  desc: String!
  condition: Conditions
}
enum Conditions {
  HARDWORKING
  LAZY
  BUSY
}

type Query {
  totalDays: Int!
  gqlDays: [GqlDay!]!
}

input AddDayInput {
  date: Date!
  desc: String!
  condition: Conditions
}
type RemoveDayPayload{
  day: GqlDay!
  removed: Boolean
  totalBefore: Int
  totalAfter: Int
}

type Mutation{
  addDay(input: AddDayInput!):GqlDay
  removeDay(id: ID!): RemoveDayPayload
}

type Subscription{
  newDay: GqlDay!    
}
`;

// //return data for schema
// const resolvers ={
// }

const mocks = { // #  "No mock defined for type \"Date\"",
  Date: () => "3/1/2024",
  String: () => "Coka cola XL",
  Query: () => ({
      // It appears that the MockList resolver has been deprecated and eliminated in Apollo Server 3.X.
      // issue: "MockList is not a constructor",
      // gqlDays:()=>new MockList(5) 
      gqlDays: () => {
          // Create an array of that length, filled with undefined values
          // (Apollo Server's mocks will fill in the actual data)
          // const length = Math.floor(Math.random() * 3) + 1;
          return [...new Array(5)];

      }
  })
};

const server = new ApolloServer({ // ApolloServer instance
  typeDefs, // Corrected from typeDef to typeDefs
  // mocks: true // Mock data for the schema
  mocks: mocks
});

server.listen().then(({
  url
}) => console.log(`Server Running at ${url}`));