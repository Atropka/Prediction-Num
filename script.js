// подключение canvas
var canvas = document.getElementById("canvas");
40;
var ctx = canvas.getContext("2d");
var dragging = false;
var pos = { x: 0, y: 0 };

// без касания
canvas.addEventListener("mousedown", engage);
canvas.addEventListener("mousedown", setPosition);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", disengage);

// касание
canvas.addEventListener("touchstart", engage);
canvas.addEventListener("touchmove", setPosition);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", disengage);

// детект нажатия на окно
function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

// детект нажатия

function engage() {
  dragging = true;
}

function disengage() {
  dragging = false;
}

// эффект касания
function setPosition(e) {
  if (isTouchDevice()) {
    var touch = e.touches[0];
    pos.x = touch.clientX - ctx.canvas.offsetLeft;
    pos.y = touch.clientY - ctx.canvas.offsetTop;
  } else {
    pos.x = e.clientX - ctx.canvas.offsetLeft;
    pos.y = e.clientY - ctx.canvas.offsetTop;
  }
}

// рисование линии при нажатии
function draw(e) {
  e.preventDefault();
  e.stopPropagation();

  if (dragging) {
    //начало рисования
    ctx.beginPath();

    //свойства линии
    ctx.lineWidth = 40;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#1e9bff";

    // Сбор данных о точках нарисованной линии
    ctx.moveTo(pos.x, pos.y);
    setPosition(e);
    ctx.lineTo(pos.x, pos.y);

    // рисовать
    ctx.stroke();
  }
}

// очистить
function erase() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// загрузка модели
async function loadModel() {
  model = await tf.loadLayersModel("tensorflow/model.json");

  model.predict(tf.zeros([1, 28, 28, 1]));

  return model;
}

// получение изображения
function getData() {
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

// определяет функцию вывода модели.
async function predictModel() {
  // получает данные изображения
  imageData = getData();

  // преобразует объект данных canvas в тензор
  image = tf.browser.fromPixels(imageData);
  console.log(image);
  // предварительная обработка изображения
  image = tf.image
    .resizeBilinear(image, [28, 28])
    .sum(2)
    .expandDims(0)
    .expandDims(-1);

  // получает прогнозирование модели
  y = model.predict(image);

  // заменяет текст в теге результата на предсказание модели
  document.getElementById("result").innerHTML =
    "Prediction: " + y.argMax(1).dataSync();
}

// загружает модель
var model = loadModel();
