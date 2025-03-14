let elDropdownList;
let styleDropdownList;
let elDropdownHeader;
let selectedEl;

// Links CSS selectors to the properties that can be assigned to those elements.
const selectorMap = [
  { selector: "body", properties: ["color", "background", "font-size"] },
  { selector: "article", properties: ["color", "background", "font-size"] },
  { selector: "section", properties: ["color", "background", "font-size"] },
  { selector: "header", properties: ["color", "background", "font-size"] },
  { selector: "footer", properties: ["color", "background", "font-size"] },
];
// Links CSS properties to the types of inputs needed to address them in the popup.
const styleMap = [
  { property: "color", inputs: ["color"] },
  { property: "background", inputs: ["color"] },
  { property: "font-size", inputs: ["text"] },
]

window.addEventListener("load", () => {
  // Accessing by id instead of class (possibly violating BEM?) for better maintainability and readability.
  elDropdownList = document.getElementById("element-selector-list");
  styleDropdownList = document.getElementById("style-selector-list");
  elDropdownHeader = document.getElementById("element-selector-header");

  updateStylableElementList();
  updateStylablePropertiesList();
});

// Fills Element dropdown with list of elements available for styling.
function updateStylableElementList() {
  if (!elDropdownList) return; // Prevents error due to script loading delays
  elDropdownList.replaceChildren();

  let styleables = getStyleableElements();
  styleables.forEach(styleableEl => {
    addElementToDropdown(elDropdownList, styleableEl, (el) => { 
      selectedEl = el;
      updateStylableElementList();
      updateStylablePropertiesList();
    });
  });
}

// Fills style dropdown with list of available style properties for the element selected with the Element dropdown.
function updateStylablePropertiesList() {
  styleDropdownList.replaceChildren();
  if (!selectedEl) {
    styleDropdownList.previousElementSibling.classList.add("nav-dropdown__button--empty");
    return;
  }

  let properties = getStyleableProperties(selectedEl);
  // Rounds nav-dropdown__button if the dropdown is empty.
  if (properties.length == 0) {
    styleDropdownList.previousElementSibling.classList.add("nav-dropdown__button--empty");
  } else {
    styleDropdownList.previousElementSibling.classList.remove("nav-dropdown__button--empty");
  }

  properties.forEach(property => {
    addItemToDropdown(styleDropdownList, property, (clickedProp) => {
      let inputs = styleMap.find(mapping => {
        return mapping.property == clickedProp;
      }).inputs;
      let index = 0; // Ensures unique name for inputs.
      inputs = inputs.map(input => {
        index++;
        return { type: input, name: `${input}${index}` };
      });

      createPopup(`Select ${property} for ${selectedEl.tagName.toLowerCase()}`, inputs,
        (output) => {
          selectedEl.style[property] = output[inputs[0].name];
        });
    });
  })
}

function getStyleableElements() {
  let selectors = selectorMap.map(styleMapping => { return styleMapping.selector; });
  let elements = document.querySelectorAll(selectors);
  let visibleElements = [];
  elements.forEach(element => {
    if (checkVisibility(element)) {
      visibleElements.push(element);
    }
  });
  return visibleElements;
}

function getStyleableProperties(element) {
  return selectorMap.find(mapping => {
    return mapping.selector == element.tagName.toLowerCase(); 
  }).properties;
}

// Checks if an element is visible (based on style.display), and also checks the element's parents.
function checkVisibility(element) {
  if (!element) return false;
  while (element) {
    if (window.getComputedStyle(element).display == "none") return false;
    element = element.parentElement;
  }
  return true;
}