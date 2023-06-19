const express = require('express');
const PORT = 3000;
const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('*', (req, res) => {
  res.sendFile('./dist/index.html', { root : __dirname });
})

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}!`);
  console.log(`ОТКРЫТЬ ПРИЛОЖЕНИЕ: >>> http://localhost:${PORT} <<<`);
});