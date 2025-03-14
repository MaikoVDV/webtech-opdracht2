let elDropdownList;
let styleDropdownList;
let elDropdownHeader;
let selectedEl;

const selectorMap = [
  { selector: "body", properties: ["color", "background", "font-size"] },
  { selector: "article", properties: ["color", "background", "font-size"] },
  { selector: "section", properties: ["color", "background", "font-size"] },
  { selector: "header", properties: ["color", "background", "font-size"] },
  { selector: "footer", properties: ["color", "background", "font-size"] },
];
const styleMap = [
  { property: "color", inputs: ["color"] },
  { property: "background", inputs: ["color"] },
  { property: "font-size", inputs: ["text"] },
]

window.addEventListener("load", () => {
  elDropdownList = document.getElementById("element-selector-list");
  styleDropdownList = document.getElementById("style-selector-list");
  elDropdownHeader = document.getElementById("element-selector-header");
  console.log(elDropdownHeader);

  updateStylableElementList();
  updateStylablePropertiesList();
});

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
function updateStylablePropertiesList() {
  styleDropdownList.replaceChildren();
  if (!selectedEl) return;

  let properties = getStyleableProperties(selectedEl);
  properties.forEach(property => {
    addItemToDropdown(styleDropdownList, property, (clickedProp) => {
      let inputs = styleMap.find(mapping => {
        return mapping.property == clickedProp;
      }).inputs;
      let index = 0;
      inputs = inputs.map(input => {
        index++;
        return { type: input, name: `${input}${index}`}
      })
      createPopup(`Select ${property} for ${selectedEl.tagName.toLowerCase()}`, inputs,
        (output) => {
          console.log(output[inputs[0]]);
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
  // console.log(selectorMap[{ selector: element.tagName.toLowerCase() }]);
  // console.log(element.tagName.toLowerCase());
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