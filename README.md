## Инструкция по использованию

Данная программа предназначена для сортировки больших файлов, которые не умещаются в оперативной памяти. Она разделяет файл на маленькие части (чанки), сортирует каждую часть отдельно, а затем объединяет отсортированные чанки в итоговый файл.

## Инструкция по клонированию репозитория

- Нажмите на кнопку "Code" (или "Код") и скопируйте URL репозитория
- Откройте командную строку или терминал на вашем компьютере и перейдите в каталог, где вы хотите сохранить репозиторий.
- Выполните следующую команду:

```sh
git clone https://github.com/hardMode551/Sorting_App.git
```

## Установка зависимостей

Перед началом использования программы, убедитесь, что у вас установлена последняя версия Node.js.

Для установки необходимых зависимостей выполните следующую команду с использованием Yarn:

```sh
yarn add
```

## Генерация файла

Перед началом использования программы сгенерируйте исходный файл с большим количеством строк. В результате выполнения кода будет сгенерирован файл с данными, содержащими имена работников и их случайные показатели продаж. Файл будет сохранен по указанному пути ./input/large_file.txt.

Для генерации данных выполните следующую команду:

```sh
node generating.js
```

## Сортировка большого файла

Для запуска сортировки большого файла выполните следующую команду:

```sh
yarn server
```

Программа разделит входной файл на чанки, отсортирует каждый чанк отдельно и объединит отсортированные чанки в итоговый файл sorted_file.txt в папке output.

По завершении сортировки будет выведено сообщение "Сортировка завершена."

## Настройки

Если вы хотите изменить параметры программы, вы можете внести следующие изменения:

- chunkSize - размер чанка в строках. Вы можете изменить значение переменной chunkSize в функции sortLargeFile для определения желаемого размера чанка.
- Пути к файлам: inputFilePath и outputFilePath. Вы можете изменить значения этих переменных в примере использования для указания желаемых путей к входному и выходному файлам.

Примечание: Убедитесь, что папки input и output существуют перед запуском программы. Если они отсутствуют, создайте их в корневом каталоге программы.

<h3>ENG</h3>

## Instructions for use

This program is designed to sort large files that do not fit into RAM. It divides a file into smaller chunks, sorts each chunk separately, and then combines the sorted chunks into a final file.

## Instructions for cloning a repository

- Click on "Code" (or "code") and copy the repository URL
- Open a command line or terminal on your computer and go to the directory where you want to save the repository.
- Execute the following command:

```sh
git clone https://github.com/hardMode551/sorting-app.git
```

## Installing dependencies

Make sure you have the latest version of Node.js installed before using the program.

To install the required dependencies, run the following command using Yarn:

```sh
yarn add
```

## File generation

Generate a source file with a large number of lines before starting to use the program. Before you start using the program, generate a source file with a large number of lines. Execution of the code will generate a data file containing the names of the workers and their random sales figures. The file will be saved at the specified path ./input/large_file.txt.

Execute the following command to generate the data:

```sh
node generating.js
```

## Sort large file

Execute the following command to start sorting a large file:

```sh
yarn server
```

The program will divide the input file into chunks, sort each chunk separately and merge the sorted chunks into the final sorted_file.txt file in the output folder.

When the sorting is complete, the message "Sorting complete." will be displayed.

## Settings

If you want to change the settings of the program, you can do the following

- chunkSize - chunk size in lines. You can change the value of chunkSize in the sortLargeFile function to determine the desired chunk size.
- File paths: inputFilePath and outputFilePath. You can change the values of these variables in the usage example to specify the desired input and output file paths.

Note: Make sure that the input and output folders exist before running the program. If they do not exist, create them in the root directory of the program.
#
