window.addEventListener("load", () => {
  var fileUpload = document.getElementById("card__file-input");

  fileUpload.addEventListener("change", handleFileUpload);
});

function handleFileUpload(event) {
  const file = event.target.files[0];

  if (!file) {
    // No file was entered.
    console.warn("Changed file input but did not select any file.");
    return;
  }
  if (file.type != "application/json") {
    console.warn(`Selected a file with the wrong extension: ${file.type}`);
  }

  const reader = new FileReader();
  reader.addEventListener("error", () => {
    console.error(`An unknown error occurred while reading ${file.name}`);
  });
  reader.addEventListener("load", () => {
    readUploadedData(reader.result);
  });

  reader.readAsText(file);

  console.log(`Selected ${file.name}`);
}

function readUploadedData(jsonString) {
  var uploadedObject = JSON.parse(jsonString);
  console.log(uploadedObject);
}