const express = require('express');
const PORT = 3000;
const app = express();

app.use(express.static(__dirname + '/dist'));

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}!`);
  console.log(`Открыть приложение: http://localhost:${PORT}`);
});