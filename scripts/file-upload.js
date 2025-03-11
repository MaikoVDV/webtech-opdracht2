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
}

function readUploadedData(jsonString) {
  let uploadedData = JSON.parse(jsonString);
  let processedArray = [];

  if(!Array.isArray(uploadedData)) {
    console.error("Uploaded invalid JSON file - root element is not an array.");
    return;
  }
  uploadedData.forEach(obj => {
    if (obj.type && classMap[obj.type]) {
      /// TODO: There should be a more elegant way of determining which array to store the object in.
      /// Maybe some reference stored in classMap?
      switch (obj.type) {
        case "Person":
          people.push(classMap[obj.type].fromObj(obj));
          break;
        case "Student":
          students.push(classMap[obj.type].fromObj(obj));
          break;
        case "Course":
          courses.push(classMap[obj.type].fromObj(obj));
          break;
        default:
          console.error("Tried storing unknown object which does appear in classMap.");
          break;
      }
    }
  });
  updateDOM();
}