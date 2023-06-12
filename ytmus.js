const readline = require('readline');
const ytdl = require('ytdl-core');
const fs = require('fs');
const url = require('url');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Введите URL для скачивания: ", function(URLString) {
  console.log(`Загрузка аудио по URL: ${URLString}`);
  const parsedURL = url.parse(URLString);
  const path = parsedURL.pathname.split('/').pop() + '.mp3';

  ytdl(URLString, { filter: 'audioonly' }).pipe(fs.createWriteStream(path));
  console.log(`Аудио сохранено под названием: ${path}`);
  rl.close();
});
