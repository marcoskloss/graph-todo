import fastify, { FastifyInstance } from 'fastify';
import mercurius from 'mercurius';

export class Server {
  private app: FastifyInstance;

  constructor(private port = 3000) {}

  public async init() {
    await this.setupServer();
    // TODO: setup database
  }

  public start() {
    this.app.listen({ port: this.port });
  }

  private async setupServer() {
    this.app = fastify({ logger: true });
    const schema = `
      type Query {
        add(x: Int, y: Int): Int
        hello(name: String): String!
      }
    `;

    const resolvers = {
      Query: {
        add: async (_: unknown, { x, y }: { x: number; y: number }) => x + y,
        hello: (_: unknown, { name }: { name: string }) => 'hello ' + name,
      },
    };

    this.app.register(mercurius, {
      schema,
      resolvers,
      graphiql: true,
      routes: true,
      errorFormatter: (err, ctx) => {
        const response = mercurius.defaultErrorFormatter(err, ctx);
        response.statusCode = 200;
        return response;
      },
    });
  }

  public async close() {
    if (this.app === undefined) return;

    await this.app.close();
    // TODO: close db connection
  }
}

