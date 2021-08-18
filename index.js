document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".form").addEventListener("submit", (e) => {
    e.preventDefault();
    let numRows = document.querySelector("#numRows").value || 4;
    if (numRows < 2 || numRows > 10 || !(numRows % 2 === 0)) {numRows = 4;}
    localStorage.setItem("numRows", `${numRows}`);
    open("./game.html", "_self");
  });
});
