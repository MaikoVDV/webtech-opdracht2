window.addEventListener("load", () => {
  console.log("haaai xx");
  var fileUpload = document.getElementById("card__file-input");
  fileUpload.addEventListener("change", () => {
    console.log("changed input");
  });
});