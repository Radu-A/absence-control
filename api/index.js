const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();

// Importante: Usamos process.cwd() para encontrar el db.json en la raíz del proyecto
const router = jsonServer.router(path.join(process.cwd(), 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Regla para que json-server entienda las rutas que vienen con el prefijo /api
server.use(jsonServer.rewriter({
  "/api/*": "/$1"
}));

server.use(router);

module.exports = server;