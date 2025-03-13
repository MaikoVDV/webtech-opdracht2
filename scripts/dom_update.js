// let people = [];
let students = [];
let courses = [];

const navbar = document.getElementById("navbar");

function updateDOM() {
  addContentToPages(students, courses);
  addDynamicPagesToNavbar();
};

function addContentToPages(students, courses) {
  for (let i = 0; i < items.length; i++) {
    const p = elementBuilder("p", { class: "profile__row-description" })
    p.class = "profile__row-description";

    const img = document.createElement("img");
    img.class = "profile__row-image";
    img.src = "assets/Test_Image.jpg";
    img.alt = "A test image.";

    const section = document.createElement("section");
    section.class = "profile__row";

    const span = document.createElement("span");
    span.class = "horizontal-bar";

    const h1 = document.createElement("h1");
    h1.class = "profile__title";

    const main = document.createElement("main");
    main.id = (i + 1).toString();
    main.class = "page";

    document.body.replaceChild(main);
  };
};

function addDynamicPagesToNavbar() {
  if (navbar.childElementCount > 1) resetNavbar();

  addItemsToNavbar(students);
};

function addItemsToNavbar(items) {
  for (let i = 0; i < items.length; i++) {
    const a = document.createElement("a");
    a.textContent = items[i].firstName + " " + items[i].lastName;
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

  builtElement[args]

  return builtElement;
}