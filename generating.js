const fs = require('fs');

// Функция для генерации случайных показателей продаж в заданном диапазоне
function generateRandomSales(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для генерации данных
function generateData(totalSize) {
  const names = ['John', 'Jane', 'Mike', 'Emily', 'David', 'Sarah', 'Daniel', 'Olivia'];
  const minSales = 100;
  const maxSales = 10000;

  let currentSize = 0;
  const data = [];

  // Генерация данных, пока не достигнут заданный общий размер
  while (currentSize < totalSize) {
    const nameIndex = Math.floor(Math.random() * names.length);
    const name = names[nameIndex];
    const sales = generateRandomSales(minSales, maxSales);
    const entry = `${name},${sales}`;
    data.push(entry);
    currentSize += entry.length;
  }

  return data;
}

// Функция для генерации файла с данными
function generateFile(filePath, totalSize, namePercentage, salesPercentage) {
  const data = generateData(totalSize);
  const dataString = data.join('\n');

  // Запись данных в файл
  fs.writeFileSync(filePath, dataString, 'utf8');
  console.log(`Сгенерирован файл: ${filePath}`);
}

// Определение путей и параметров для генерации файла
const filePath = './input/large_file.txt';
const totalSizeInBytes = 90 * 1024 * 1024; // 100 МБ
const namePercentage = 50;
const salesPercentage = 50;

// Генерация файла с данными
generateFile(filePath, totalSizeInBytes, namePercentage, salesPercentage);
