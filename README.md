# Prediction-Num

_______________
## «Построение графического интерфейса и его использование»

### Условие: 
Необходимо построить графический интерфейс, основная задача которого будет графический (рукописный) ввод информации. 
_______
### Цель проекта:
Создание сайта, с использованием графического интерфейса. Функционал сайта будет представлен возможностью вводить данные графически (рукописно), возможностью прочитать, а также прослушать напечатанный текст. 
_______

## Теория работы:
### 1) У нас имеется модель сайта с графическим интерфейсом.
![test-1](https://sun9-41.userapi.com/impg/yxANsie846ewFQ6-V3Fn_JCsTxi7DOnhXs8Sqg/-47aQz2ZL_k.jpg?size=583x403&quality=96&sign=537282b8fc32a43899f6446f7bc785a4&type=album)

### 2) При рисовании в области действия интерфейса создается изображение.
![test-2](https://sun9-82.userapi.com/impg/XxQSEoWafB5DPaI63KK7BMo_Nd91DDq1591wpQ/0_uwcBxe8TQ.jpg?size=986x411&quality=96&sign=98493e444155eb7f0c5039a14050d632&type=album)

### 3) После создания изображения, его необходимо обработать. Оно разделяется на некоторое количество изображений и уменьшается по размерам, для корректной работы нейросети.
![test-3](https://sun9-43.userapi.com/impg/ZiFP7Dg2S11svHK3LCZdaL4jnzZfXWkoFsWXqQ/0idfJFyVAbE.jpg?size=839x321&quality=96&sign=f564f43ee6318ac6421c293b0cbb9ea6&type=album)

### 4) Далее в дело вступает нейросеть. Она берет получившиеся изображения  и сравнивает их с изображениями получившимися в результате её обучения.
![test-4](https://sun9-88.userapi.com/impg/vuk7cNf6KYYvzYY6lLYZ7lOYOV2V_pO3O3WXlg/SQod_zJSzTo.jpg?size=803x258&quality=96&sign=0999db1c779cc9026a504cf6ccf7a490&type=album)

### 5) Результатом работы нейросети является конечное значение, которое выводится в консоль. После этого полученный результат передается в функцию, которая выводит его в отдельное окно на сайте.
![test-5](https://sun9-35.userapi.com/impg/0cPsmnEepQ5Twj39aLCZxXoEaGDeidGqwytKUA/85GHrFQ517I.jpg?size=478x305&quality=96&sign=348a9906ee4a916be2580805964251dd&type=album)
______
# :exclamation: ВАЖНО! Нееросеть была взята из открытого источника! :exclamation: 

_______


```js
{
//Создание графического интерфейса на сайте
canvas = document.getElementById("canvas");
40;
ctx = canvas.getContext("2d");
dragging = false;
pos = { x: 0, y: 0 };
}

// движение мыши
canvas.addEventListener("mousedown", engage);
canvas.addEventListener("mousedown", setPosition);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", disengage);

// нажатие
canvas.addEventListener("touchstart", engage);
canvas.addEventListener("touchmove", setPosition);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", disengage);

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
 
// очистить
function erase() {
 ctx.clearRect(0, 0, canvas.width, canvas.height);
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
 }
```

```js
// Реализация госового ответа     
function talk() {
 speechSynthesis.speak(new SpeechSynthesisUtterance(y.argMax(1).dataSync())) 
         }
  
 
```

_______________
# Результат работы сайта (Инициализация):
![resualt-1](https://sun9-35.userapi.com/impg/msgQt8XTGb_MjuEV2QG_-yz9cTEWJ8KFWUsqYQ/P_-s208sHQ4.jpg?size=1046x777&quality=96&sign=78ff360b81d4d1a162f3bf7380b635bb&type=album)

# Результат работы сайта (Рисование):
![resualt-2](https://sun9-53.userapi.com/impg/Gu9Yo7CFn1v7ta5iDcCOKt7QLXRmbltaUIWNJA/GOzXRgCFu_Y.jpg?size=1013x788&quality=96&sign=8098035458643308db15a3d1e6e221eb&type=album)

# Результат работы сайта (Работа "предсказания"):
![resualt-3](https://sun9-13.userapi.com/impg/oKRKQ0Q2W4xcQ7p7W3uIHuphjhfUvHBVnYlxDQ/RVBxIxuFyBw.jpg?size=1110x784&quality=96&sign=5aaf74aa2a3d33f8b2d8f84655392451&type=album)

# Результат работы сайта (Реализация кнопки очистить):
![resualt-4](https://sun9-72.userapi.com/impg/hTW-t04iscsOPidOcE644gFaerzgzzCRaFR7Yg/K_5rRV7Fn1c.jpg?size=1121x776&quality=96&sign=2a0f26754c7529fc885266d8892681cf&type=album)
