export default `
  type Query {
    hello(name: String): String!
  }

  type Todo {
    id: ID!
    content: String!
    done: Boolean!
    createdAt: Date
  }
`;
