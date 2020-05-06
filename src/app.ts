import { join } from 'path';
import fastify from 'fastify';
import fastifyBlipp from 'fastify-blipp';
import fastifyStatic from 'fastify-static';
import fastifyFormbody from 'fastify-formbody';
import processRoutes from './routes/process';

const isDev = process.env.NODE_ENV === 'development';
const server: fastify.FastifyInstance = fastify({
  logger: { prettyPrint: isDev },
});

server.register(fastifyBlipp);
server.register(fastifyFormbody);
server.register(processRoutes);
server.register(fastifyStatic, {
  root: join(__dirname, 'public'),
});

const start = async () => {
  try {
    await server.listen(3000, '0.0.0.0');
    server.blipp();
  } catch (err) {
    console.log(err);
    server.log.error(err);
    process.exit(1);
  }
};

process.on('uncaughtException', console.error);
process.on('unhandledRejection', console.error);

start();
