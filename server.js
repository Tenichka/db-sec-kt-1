const fastify = require('fastify')({ logger: true });
const path = require('path');


fastify.register(require('point-of-view'), {
  engine: {
    handlebars: require('handlebars')
  },
  templates: path.join(__dirname, 'views')
});

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/',
})

fastify.get('/', (request, reply) => {
  reply.view('index.hbs');
});

fastify.get('/api', (request, reply) => {
  reply.send({ message: "Запрос прошел успешно" });
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log(`Server listening on http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();