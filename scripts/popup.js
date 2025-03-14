
// [options] is an array containing { type: "text/buttons" }
function createPopup(header, options, submitHandler) {
  let popup = elementBuilder("article", {class: "popup"});
  document.body.appendChild(popup);

  popup.appendChild(elementBuilder("div", {class: "popup__shadow"}));
  const popupWin = popup.appendChild(elementBuilder("section", {class: "popup__window"}));
  popupWin.appendChild(elementBuilder("h2", {class: "popup__header", textContent: header}));
  const optionsContainer = popupWin.appendChild(elementBuilder("div", {class: "popup__options-container"}));
  options.forEach(option => {
    switch (option.type) {
      case "text":
        optionsContainer.appendChild(elementBuilder("input", {
          class: "popup__text-input",
          type: "text",
          name: option.name}));
        break;
      case "radio":
        const btnList = optionsContainer.appendChild(elementBuilder("div", {class: "popup__radio-list"}));
        option.subOptions.forEach(subOption => {
          let radioOption = btnList.appendChild(elementBuilder("div", {class: "popup__radio-container"}));

          let id = `popup__${option.name}-radio--${subOption}`;
          radioOption.appendChild(elementBuilder("input", {
            class: "popup__radio",
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
          class: "popup__color-picker",
          type: "color",
          name: option.name}));
        break;
    }
  });
  const controls = popupWin.appendChild(elementBuilder("div", {class: "popup__controls"}));
  const cancel = controls.appendChild(elementBuilder("button", {class: "popup__button popup__button--cancel", textContent: "Cancel"}));
  const submit = controls.appendChild(elementBuilder("input", {class: "popup__button popup__button--submit", type: "submit", value: "Submit"}));
  
  cancel.addEventListener("click", () => { popup.remove(); });
  
  // Returns key-value pairs stored in output object. Keys are the inputs' names, values are their values (taken from value attribute).
  submit.addEventListener("click", () => {
    const inputs = document.querySelectorAll(`.popup__text-input, .popup__radio, .popup__color-picker`);
    let output = {};
    inputs.forEach(input => {
      output[input.name] = input.value;
    });
    
    popup.remove();
    submitHandler(output);
  });
}