import { Server } from './infra/server';

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

(async () => {
  try {
    const server = new Server();
    await server.init();
    server.start();

    // TODO: handle exit signals
  } catch (error) {
    // TODO: go find some logger to use!
    console.log('Error when starting server', error);
    process.exit(ExitStatus.Failure);
  }
})();
