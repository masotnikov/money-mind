const jsonServer = require("json-server");
const path = require("path");
const express = require("express");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, "build"),
});

const port = process.env.PORT || 3001;
server.use(middlewares);

// Настройка для обслуживания статических файлов
server.use(express.static(path.join(__dirname, "build")));

// Перенаправление запросов на основной маршрут для SPA
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

server.use(
  jsonServer.rewrites({
    "/api/*": "/$1",
  })
);

server.use(router);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
