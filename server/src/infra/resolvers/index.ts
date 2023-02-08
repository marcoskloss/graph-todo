import { HelloQuery } from './hello-query';

export default {
  Query: {
    hello: async (...args) => {
      const helloQuery = new HelloQuery();
      return helloQuery.hello(...args);
    },
  }
};

