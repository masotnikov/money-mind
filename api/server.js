const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '..', 'db.json')); // корректируем путь к db.json
const middlewares = jsonServer.defaults();

// Устанавливаем путь /api для маршрутов JSON сервера
server.use(middlewares);
server.use('/api', router);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
