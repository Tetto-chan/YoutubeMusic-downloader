const readline = require('readline');
const ytdl = require('ytdl-core');
const fs = require('fs');
const url = require('url');
const cliProgress = require('cli-progress');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Введите URL для скачивания: ", function(URLString) {
  console.log(`Загрузка аудио по URL: ${URLString}`);
  const parsedURL = url.parse(URLString);

  rl.question("Введите имя файла для сохранения: ", function(audioName) {
    const sanitizedAudioName = audioName.replace(/[^\w\s]/gi, '');

    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(100, 0);

    ytdl(URLString, { filter: 'audioonly' })
      .on('progress', (_, downloaded, total) => {
        const progress = (downloaded / total) * 100;
        progressBar.update(progress);
      })
      .pipe(fs.createWriteStream(`./${sanitizedAudioName}.mp3`))
      .on('finish', () => {
        progressBar.stop();
        console.log(`Аудио успешно сохранено под названием: ${sanitizedAudioName}.mp3`);
        rl.close();
      })
      .on('error', () => {
        progressBar.stop();
        console.log('Произошла ошибка при загрузке аудио');
        rl.close();
      });
  });
});
