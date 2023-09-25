const express = require('express');
const path = require('path');

const PORT = 3000;
const app = express();

app.use(express.static(path.join(`${__dirname}/dist`)));

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'dist') });
});

app.listen(PORT, () => {
  console.warn(`Сервер запущен на порту ${PORT}!`);
  console.warn(`ОТКРЫТЬ ПРИЛОЖЕНИЕ: >>> http://localhost:${PORT} <<<`);
});
