let people = [];
let students = [];
let courses = [];

const navbar = document.getElementsByClassName("navbar__pages")[0];

function updateDOM() {
  addDynamicPagesToNavbar();
  addContentToPages(students, courses);
  updateStylableElementList()
};

function addContentToPages(students, courses) {
  const body = document.body;

  for (let i = 0; i < students.length; i++) {

    const section = elementBuilder("section", { class: "profile__row" });
    section.appendChild(
      elementBuilder("img", { class: "profile__row-image", src: students[i].photo, alt: "A test image." })
    );
    section.appendChild(
      elementBuilder("p", { class: "profile__row-description", textContent: addText(students[i]) })
    );

    const main = elementBuilder("main", { id: (i + 1).toString(), class: "page" });
    main.appendChild(
      elementBuilder("h1", { class: "profile__title", textContent: students[i].fullName })
    );
    main.appendChild(
      elementBuilder("span", { class: "horizontal-bar" })
    );
    main.appendChild(section);

    body.insertBefore(main, body.children[body.childElementCount - 5]);
  };
};

function addDynamicPagesToNavbar() {
  if (navbar.childElementCount > 1) resetNavbar(), resetDynamicPages();

  addItemsToNavbar(students);
};

function addItemsToNavbar(items) {
  for (let i = 0; i < items.length; i++) {
    const a = document.createElement("a");
    a.textContent = items[i].fullName;
    a.href = `#${i + 1}`;

    a.addEventListener("click", handleLinkClick);

    const li = document.createElement("li");
    li.appendChild(a);
    navbar.appendChild(li);
  };
};

function resetNavbar() {
  navbar.innerHTML = `<li><a href="#0">Home</a></li>`;

  const a = navbar.firstElementChild.firstElementChild;
  a.addEventListener("click", handleLinkClick);
};

function resetDynamicPages() {
  const pages = document.querySelectorAll(".page");
  for (const page of pages) {
    const pageId = parseInt(page.id, 10);
    if (pageId >= 1) page.parentNode.removeChild(page);
  };
};

function handleLinkClick(e) {
  e.preventDefault();
  const selectedItem = e.target.href;
  const [_, index] = selectedItem.split("#");

  renderSelectedPage(index);
};

function renderSelectedPage(index) {
  const pages = document.querySelectorAll(".page");

  for (const page of pages) {
    page.id === index
      ? page.classList.add("selected")
      : page.classList.remove("selected");
  };
};

renderSelectedPage("0");
resetNavbar();

function elementBuilder(element, args) {
  const builtElement = document.createElement(element);

  for (const [key, value] of Object.entries(args)) {
    key === "textContent"
      ? builtElement.textContent = value
      : builtElement.setAttribute(key, value);
  }

  return builtElement;
};

function addText(obj) {
  return textContent =
    `
    Hi, I am ${obj.firstName} and I am ${obj.age} years old.
    I like to ${arrayFormatter(obj.hobbies)}.
    I am currently studying ${obj.major}, and the courses I have followed can be found below.
    Hovering over the courses gives you more information about the course.
    `;

};

function arrayFormatter(arr) {
  if (arr.length === 1) {
    return arr[0];
  } else if (arr.length === 2) {
    return arr.join(" and ");
  } else if (arr.length) {
    const lastItem = arr.pop();
    return `${arr.join(", ")} and ${lastItem}`;
  } else {
    return "do nothing, as I don't have any hobbies";
  };
}
