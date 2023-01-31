import fastify, { FastifyInstance } from 'fastify';
import mercurius from 'mercurius';
import schema from './schema';
import resolvers from './resolvers';

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
