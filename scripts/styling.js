let elDropdownList;
let elDropdownHeader;
let selectedEl;

window.addEventListener("load", () => {
  elDropdownList = document.getElementsByClassName("el-selector__list")[0];
  elDropdownHeader = document.getElementsByClassName("el-selector__button")[0];

  updateStylableElementList();
});

function updateStylableElementList() {
  let stylable = document.querySelectorAll("body, article, section, header, footer");
  elDropdownList.replaceChildren();
  stylable.forEach(styleableEl => {
    addDropdownItem(styleableEl);
  });
}

function addDropdownItem(element) {
  let button = document.createElement("button");
  button.classList.add("el-selector__option");
  if (element == selectedEl) {
    button.classList.add("el-selector__option--selected");
    elDropdownHeader.textContent = element.tagName;
  }

  button.addEventListener("click", () => selectElement(element));

  let classText = element.className != "" ? `\n"${element.className}"` : "";
  button.textContent = `${element.tagName}${classText}`;
  elDropdownList.appendChild(button);
}

function selectElement(element) {
  selectedEl = element;
  selectedEl.style.background = "red";
  updateStylableElementList();
}