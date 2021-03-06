var cell = document.getElementsByClassName("game-item"),
  reset = document.getElementById("reset-game"),
  message = document.getElementById("message"),
  player = "X", // первый ход игрока
  stepCount = 0, // счетчик ходов
  
  // выигрышные комбинации
  winCombinations = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [4, 5, 6],
    [7, 8, 9]
  ],

  // массивы для записи ходов игрока
  dataX = [], 
  dataO = [];

// цикл для событий по клику с вызовом функции текущего хода
for (var i = 0; i < cell.length; i++) {
  cell[i].addEventListener("click", currentStep);
}
// функция текузего хода
function currentStep() {
  var num = +this.getAttribute("data-cell");
  if (!this.textContent) {
    this.innerText = player;
    if (player === "X") {
      dataX.push(num) && this.classList.add("x");
    } 
    else {
      dataO.push(num) && this.classList.add("o");
    }

    if (
      (dataO.length > 2 || dataX.length > 2) &&
      (checkWin(dataO, num) || checkWin(dataX, num))
    ) {
      for (var i = 0; i < cell.length; i++) {
        cell[i].removeEventListener("click", currentStep);
      }
      return (message.innerText = "Победил игрок " + player);
    }
    changePlayer();
    stepCount++;
    if (stepCount === 9) {
      (message.innerText = "Ничья")
    }
    else{
        (message.innerText = "Ходит игрок " + player);
      } 
  }
}

function changePlayer() {
  player === "X" ? (player = "O") : (player = "X");
}

// кнопка Очистить. Обнуляются все данные.
reset.addEventListener("click", function() {
  for (var i = 0; i < cell.length; i++) {
    cell[i].innerText = "";
  }
  dataO = [];
  dataX = [];
  player = "O";
  stepCount = 0;
  message.innerText = "Ходит игрок " + player;
  for (var i = 0; i < cell.length; i++) {
    cell[i].addEventListener("click", currentStep);
    cell[i].classList.remove("x", "o");
  }
});

// Проверка победы
function checkWin(arr, number) {
  for (var w = 0, wLen = winCombinations.length; w < wLen; w++) {
    var someWinArr = winCombinations[w],
      count = 0;
    if (someWinArr.indexOf(number) !== -1) {
      for (var k = 0, kLen = someWinArr.length; k < kLen; k++) {
        if (arr.indexOf(someWinArr[k]) !== -1) {
          count++;
          if (count === 3) {
            return true;
          }
        }
      }
      count = 0;
    }
  }
}
