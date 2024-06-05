const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");

// Make sure to use the default middleware
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use('/', router);
// Listen to port
server.listen(3001, () => {
  console.log("JSON Server is running");
});

// Export the Server API
module.exports = server;