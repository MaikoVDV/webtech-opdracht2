function addElementToDropdown(dropdownEl, element, clickHandler) {
  let button = document.createElement("button");
  button.classList.add("nav-dropdown__option");
  if (element == selectedEl) {
    button.classList.add("nav-dropdown__option--selected");
    elDropdownHeader.textContent = element.tagName;
  }

  button.addEventListener("click", () => clickHandler(element));

  let classText = element.className != "" ? `\n"${element.className}"` : "";
  button.textContent = `${element.tagName}${classText}`;
  dropdownEl.appendChild(button);
}

function addItemToDropdown(dropdownEl, text, clickHandler) {
  let button = document.createElement("button");
  button.classList.add("nav-dropdown__option");

  button.addEventListener("click", () => clickHandler(text));

  button.textContent = text;
  dropdownEl.appendChild(button);
}