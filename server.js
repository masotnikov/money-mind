const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, "build"),
});

const port = process.env.PORT || 3001;
server.use(middlewares);
server.use(
  jsonServer.rewrites({
    "/api/*": "/$1",
  })
);

server.use(router);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
