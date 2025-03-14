
// [options] is an array containing { type: "text/buttons" }
function createPopup(name, header, options, submitHandler) {
  const baseName = `${name}-popup`;
  let popup = elementBuilder("article", {class: baseName});
  document.body.appendChild(popup);

  popup.appendChild(elementBuilder("div", {class: baseName + "__shadow"}));
  const popupWin = popup.appendChild(elementBuilder("section", {class: baseName + "__window"}));
  popupWin.appendChild(elementBuilder("h2", {class: baseName + "__header", textContent: header}));
  const optionsContainer = popupWin.appendChild(elementBuilder("div", {class: baseName + "__options-container"}));
  options.forEach(option => {
    switch (option.type) {
      case "text":
        optionsContainer.appendChild(elementBuilder("input", {
          class: baseName + "__text-input",
          type: "text",
          name: option.name}));
        break;
      case "radio":
        const btnList = optionsContainer.appendChild(elementBuilder("div", {class: baseName + "__radio-list"}));
        option.subOptions.forEach(subOption => {
          let radioOption = btnList.appendChild(elementBuilder("div", {class: baseName + "__radio-container"}));

          let id = `${baseName}__${option.name}-radio--${subOption}`;
          radioOption.appendChild(elementBuilder("input", {
            class: baseName + "__radio",
            id: id,
            type: "radio",
            name: option.name,
            value: subOption
          }));
          radioOption.appendChild(elementBuilder("label", {
            for: id,
            textContent: subOption
          }));
        });
        break;
      case "color":
        optionsContainer.appendChild(elementBuilder("input", {
          class: baseName + "__color-picker",
          type: "color",
          name: option.name}));
        break;
    }
  });
  const controls = popupWin.appendChild(elementBuilder("div", {class: baseName + "__controls"}));
  const cancel = controls.appendChild(elementBuilder("button", {class: "styling-popup__button styling-popup__button--cancel", textContent: "Cancel"}));
  const submit = controls.appendChild(elementBuilder("input", {class: "styling-popup__button styling-popup__button--submit", type: "submit", value: "Submit"}));
  
  cancel.addEventListener("click", () => { popup.remove(); });
  
  // Returns key-value pairs stored in output object. Keys are the inputs' names, values are their values (taken from value attribute).
  submit.addEventListener("click", () => {
    const inputs = document.querySelectorAll(`.${baseName}__text-input, .${baseName}__radio, .${baseName}__color-picker`);
    let output = {};
    inputs.forEach(input => {
      output[input.name] = input.value;
    });
    
    popup.remove();
    submitHandler(output);
  });
}