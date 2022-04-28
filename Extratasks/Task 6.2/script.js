const field = document.querySelector('#area');
const wrp = document.querySelector('#result__wrapper');
const content = document.querySelector('.content');
const overlay = document.querySelector(".overlay");
const btnClose = document.querySelector("#btn-close");

let action = 0;
let result = '';

field.addEventListener('click', function(event) {
    if (event.target.className === 'box') {
        action % 2 === 0
          ? (event.target.innerHTML = "O")
          : (event.target.innerHTML = "X");
        action++;
        check();
    } 
})

let check = () => {
    const boxes = document.querySelectorAll('.box');
    const array = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for(let i = 0; i < array.length; i++) {
        if (
          boxes[array[i][0]].innerHTML === "X" &&
          boxes[array[i][1]].innerHTML === "X" &&
          boxes[array[i][2]].innerHTML === "X"
        ) {
            result = 'Крестики';
            prepareResult(result);
        } else if (
          boxes[array[i][0]].innerHTML === "O" &&
          boxes[array[i][1]].innerHTML === "O" &&
          boxes[array[i][2]].innerHTML === "O"
          ) {
              result = "Нолики";
              prepareResult(result);
          }
    }
}

const prepareResult = winner => {
    content.innerHTML = `Winner is ${winner} !`;
    wrp.style.display = 'flex';
}

const closeModal = () => {
    wrp.style.display = "none";
    location.reload();
}

overlay.addEventListener('click', closeModal);
btnClose.addEventListener("click", closeModal);