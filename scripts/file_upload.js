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

  const uniquePersons = new Set();
  const uniqueCourses = new Set();
  const uniqueStudents = new Set();

  for (const obj of uploadedData) {
    if (
      obj.type !== "Student" ||
      uniqueStudents.has(obj.firstName + obj.lastName) ||
      !storageMap[obj.type] ||
      !Array.isArray(obj.courses)
    ) continue;

    uniqueStudents.add(obj.firstName + obj.lastName);
    storageMap["Student"].push(classMap["Student"].fromObj(obj));

    for (const course of obj.courses) {
      if (
        !course.type ||
        !storageMap[course.type] ||
        uniqueCourses.has(course.title)
      ) continue;

      uniqueCourses.add(course.title);
      storageMap["Course"].push(classMap["Course"].fromObj(course));

      if (
        !course.teacher ||
        course.teacher.type !== "Person" ||
        uniquePersons.has(`${course.teacher.firstName}${course.teacher.lastName}`)
      ) continue;

      uniquePersons.add(`${course.teacher.firstName}${course.teacher.lastName}`);
      storageMap["Person"].push(classMap["Person"].fromObj(course.teacher));
    };
  };

  updateDOM();
};