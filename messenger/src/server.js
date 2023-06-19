const express = require('express');
const PORT = 3000;
const app = express();

app.use(express.static(__dirname+'/build/index.html'));

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}!`);
});