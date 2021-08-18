document.addEventListener("DOMContentLoaded", startGame);

function startGame() {
  const app = document.querySelector("#app");
  const NUM_ROWS = +localStorage.getItem("numRows");
  const numArray = createArray(NUM_ROWS);
  let openedCard = "";
  let numOpened = 0;
  let toID;

  clearTimeout(toID);
  if (document.querySelector(".game__rows")) {
    document.querySelector(".game__rows").remove()
  };
  if (document.querySelector(".game__more-btn")) {
    document.querySelector(".game__more-btn").remove()
  };

  const rows = document.createElement("ul");
  rows.classList.add("game__rows");
  let k = 0;
  for (let i = 1; i <= NUM_ROWS; i++) {
    const row = document.createElement("ul");
    row.classList.add("game__row");
    for (let j = 1; j <= NUM_ROWS; j++) {
      const card = createCard(numArray[k], `card${++k}`)
      row.append(card);
    }
    rows.append(row);
  }
  app.append(rows);
  toID = setTimeout(endGame, 60000);


  function endGame() {
    clearTimeout(toID);
    const moreBtn = document.createElement("button");
    moreBtn.classList.add("game__more-btn");
    moreBtn.textContent = "Сыграть еще раз";
    moreBtn.addEventListener("click", startGame);
    document.querySelector("#app").append(moreBtn);
    document.querySelectorAll(".game__card").forEach(card => {
      card.removeEventListener("click", clickCard);
    });
  }

  function createCard(cardVal, cardID) {
    const card = document.createElement("li");
    card.classList.add("game__card");
    card.id = cardID;
    card.addEventListener("click", clickCard);
    const num = document.createElement("div");
    num.classList.add("game__num");
    num.textContent = cardVal;
    card.append(num);
    return card;
  }

  function clickCard(e) {
    let anotherCard;
    const card = e.target;
    card.classList.add("opened");
    if (!openedCard) {
      openedCard = `${card.id}`;
    }else{
      anotherCard = document.querySelector(`#${openedCard}`);
      openedCard = "";
      if (card.textContent !== anotherCard.textContent) {
        const toID2 = setTimeout(() => {
          card.classList.remove("opened");
          anotherCard.classList.remove("opened");
        }, 500);
      }else{
        numOpened += 2;
        if (numOpened === (NUM_ROWS * NUM_ROWS)) {
          endGame();
        }
        card.removeEventListener("click", clickCard);
        anotherCard.removeEventListener("click", clickCard);
      }
    }
  }
}

function shuffle(array) {
  let curI = array.length;
  let randI;
  while (curI !== 0) {
    randI = Math.floor(Math.random() * curI);
    curI--;
    [array[curI], array[randI]] = [array[randI], array[curI]];
  }
  return array;
}

function createArray(numRows) {
  let array = Array.from(Array(numRows * numRows), (_, x) => Math.floor(x / 2) +1);
  return shuffle(array);
}
