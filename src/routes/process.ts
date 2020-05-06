import plugin from 'fastify-plugin';

export default plugin((server, _, next) => {
  server.post('/process', async (request, reply) => {
    return reply.code(200).send({
      date: new Date(),
      token: request.body['cko-card-token'],
    });
  });

  next();
});
