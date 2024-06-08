const express = require("express");
const jsonServer = require("json-server");
const path = require("path");

const app = express();
const jsonServerRouter = jsonServer.router("db.json");
const jsonServerMiddlewares = jsonServer.defaults();
const port = process.env.PORT || 3001;

app.use("/api", jsonServerMiddlewares); // Применяем мидлвары json-server для пути /api
app.use("/api", jsonServerRouter); // Подключаем json-server для пути /api

// Обслуживание статических файлов React приложения из папки build
app.use(express.static(path.join(__dirname, "build")));

// При запросе на любой путь, кроме /api, отдаем статический файл index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
