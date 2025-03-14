
function createPopup(header, [options], submitHandler) {
  let popup = document.querySelector(".styling-popup");
  popup.style.display = "block";
  let submitBtn = document.querySelector(".styling-popup__button--submit");
  submitBtn.addEventListener("click", () => {
    let inputText = document.querySelector(".styling-popup__text-input").value;
    console.log(inputText);
    popup.style.display = "none";
  });
}