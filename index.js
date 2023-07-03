const fs = require('fs');
const readline = require('readline');
const { promisify } = require('util');

const mkdir = promisify(fs.mkdir);
const unlink = promisify(fs.unlink);

async function sortLargeFile(inputFilePath, outputFilePath) {
  const tempDir = './temp';
  const chunkSize = 500000; // Размер чанка в строках

  try {
    // Создаем временную директорию, если она не существует
    if (!fs.existsSync(tempDir)) {
      await mkdir(tempDir);
    }

    // Сортируем большой файл путем разделения на чанки, сортировки каждого чанка и их объединения
    const chunkFilePaths = await splitIntoChunks(inputFilePath, tempDir, chunkSize);
    const sortedChunkFilePaths = await sortChunks(chunkFilePaths);
    await mergeSortedChunks(sortedChunkFilePaths, outputFilePath);

    // Удаляем временные файлы
    await Promise.all(chunkFilePaths.map((filePath) => unlink(filePath)));
    await Promise.all(sortedChunkFilePaths.map((filePath) => unlink(filePath)));

    console.log('Сортировка завершена.');
  } catch (error) {
    console.error('Произошла ошибка при сортировке:', error);
  }
}

// Разделение большого файла на чанки
async function splitIntoChunks(inputFilePath, tempDir, chunkSize) {
  const chunkFilePaths = [];

  const inputStream = fs.createReadStream(inputFilePath, { encoding: 'utf8' });
  const lineReader = readline.createInterface({ input: inputStream });

  let lineCount = 0;
  let chunkIndex = 0;
  let outputFilePath = getChunkFilePath(tempDir, chunkIndex);

  let chunkWriteStream = fs.createWriteStream(outputFilePath, { flags: 'a', encoding: 'utf8' });

  for await (const line of lineReader) {
    chunkWriteStream.write(line + '\n');
    lineCount++;

    if (lineCount === chunkSize) {
      chunkWriteStream.end();
      chunkFilePaths.push(outputFilePath);
      chunkIndex++;
      outputFilePath = getChunkFilePath(tempDir, chunkIndex);
      lineCount = 0;
      chunkWriteStream = fs.createWriteStream(outputFilePath, { flags: 'a', encoding: 'utf8' });
    }
  }

  chunkWriteStream.end();
  chunkFilePaths.push(outputFilePath);

  return chunkFilePaths;
}

// Формирование пути к файлу чанка
function getChunkFilePath(tempDir, chunkIndex) {
  const filename = `chunk_${chunkIndex}.txt`;
  return `${tempDir}/${filename}`;
}

// Сортировка каждого чанка
async function sortChunks(chunkFilePaths) {
  const sortedChunkFilePaths = [];

  await Promise.all(
    chunkFilePaths.map(async (chunkFilePath) => {
      const lines = [];

      const inputStream = fs.createReadStream(chunkFilePath, { encoding: 'utf8' });
      const lineReader = readline.createInterface({ input: inputStream });

      for await (const line of lineReader) {
        lines.push(line);
      }

      const sortedLines = lines.sort();

      const sortedChunkFilePath = chunkFilePath.replace('chunk_', 'sorted_chunk_');
      const sortedChunkWriteStream = fs.createWriteStream(sortedChunkFilePath, {
        encoding: 'utf8',
      });

      for (const line of sortedLines) {
        sortedChunkWriteStream.write(line + '\n');
      }

      sortedChunkWriteStream.end();

      sortedChunkFilePaths.push(sortedChunkFilePath);
    }),
  );

  return sortedChunkFilePaths;
}

// Объединение отсортированных чанков в конечный файл
async function mergeSortedChunks(sortedChunkFilePaths, outputFilePath) {
  const outputStream = fs.createWriteStream(outputFilePath, { encoding: 'utf8' });

  for (const sortedChunkFilePath of sortedChunkFilePaths) {
    const inputStream = fs.createReadStream(sortedChunkFilePath, { encoding: 'utf8' });
    await new Promise((resolve, reject) => {
      inputStream.pipe(outputStream, { end: false });
      inputStream.on('end', resolve);
      inputStream.on('error', reject);
    });
  }

  outputStream.end();
}

// Пример использования
const inputFilePath = './input/large_file.txt';
const outputFilePath = './output/sorted_file.txt';

sortLargeFile(inputFilePath, outputFilePath);
