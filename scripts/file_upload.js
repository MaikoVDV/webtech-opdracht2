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
  };
  if (file.type != "application/json") {
    console.warn(`Selected a file with the wrong extension: ${file.type}`);
  };

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

  if (!Array.isArray(uploadedData)) {
    alert("Uploaded invalid JSON file - root element is not an array.");
    console.error("Uploaded invalid JSON file - root element is not an array.");
    return;
  };

  const storageMap = {
    Person: people,
    Student: students,
    Course: courses,
  };

  Object.keys(storageMap).forEach((key) => storageMap[key].length = 0);

  for (const obj of uploadedData) {
    if (obj.type && classMap[obj.type]) {
      const targetArray = storageMap[obj.type];

      if (targetArray) {
        targetArray.push(classMap[obj.type].fromObj(obj));
      } else {
        console.error(`Tried storing unknown object type: ${obj.type}`);
      };
    };
  };

  updateDOM();
}