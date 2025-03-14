let people = [];
let students = [];
let courses = [];

const navbar = document.getElementsByClassName("navbar__pages")[0];

function updateDOM() {
  console.log(people, students, courses);
  addDynamicPagesToNavbar();
  addContentToPages(students, courses);
  updateStylableElementList()
};

function addContentToPages(students, courses) {
  const body = document.body;

  for (let i = 0; i < students.length; i++) {
    const student = students[i];

    const profileRow = elementBuilder("section", { class: "content__row" });
    profileRow.append(
      elementBuilder("img", { class: "content__row-image", src: student.photo, alt: student.photo.split("/").pop() }),
      elementBuilder("p", { class: "content__row-description", textContent: addText(student) })
    );

    const buttonCardContainer = elementBuilder("a", { href: `mailto:${student.email}`, class: "card-container" });
    buttonCardContainer.append(
      elementBuilder("section", { class: "card", innerHTML: `<p>${student.email}</p>` })
    );

    const coursesRows = [];
    let cardCount = 0;
    let coursesRow;

    for (const course of courses) {
      if (student.courses.some(c => c.title === course.title)) {
        if (cardCount === 0 || cardCount % 2 === 0) {
          coursesRow = elementBuilder("section", { class: "content__row" });
          coursesRows.push(coursesRow);
        };

        const courseCardContainer = elementBuilder("section", { class: "coursecard-container" });
        const card = courseCardContainer.appendChild(
          elementBuilder("section", {
            class: "coursecard",
            innerHTML: `<p>${course.title}</p>`,
            "tooltip-data__title": course.title,
            "tooltip-data__description": course.description,
            "tooltip-data__teacher": course.teacher.fullName
          })
        );
        const tooltip = card.appendChild(
          elementBuilder("div", {
            class: "course-tooltip"
          })
        );
        tooltip.appendChild(
          elementBuilder("p", {
            textContent: course.title
          })
        );
        tooltip.appendChild(
          elementBuilder("p", {
            textContent: course.description
          })
        );
        console.log(course.teacher);
        tooltip.appendChild(
          elementBuilder("p", {
            textContent: `${course.teacher.firstName} ${course.teacher.lastName}`
          })
        );
        coursesRow.appendChild(
          courseCardContainer
        );
        cardCount++;
      };
    };

    const article = elementBuilder("article", { class: "content" });
    article.append(
      elementBuilder("h1", { class: "content__title", textContent: student.fullName }),
      elementBuilder("span", { class: "horizontal-bar" }),
      profileRow,
      elementBuilder("span", { class: "horizontal-bar--transparent" }),
      elementBuilder("p", { class: "content__row-description", textContent: "If you would like to contact me, you can send me an email:" }),
      buttonCardContainer,
      elementBuilder("span", { class: "horizontal-bar--transparent" }),
      elementBuilder("span", { class: "horizontal-bar--transparent" }),
      elementBuilder("h3", { class: "content__title", textContent: "My courses" }),
      ...coursesRows
    );

    const main = elementBuilder("main", { id: (i + 1).toString(), class: "page" });
    main.append(
      article
    );

    body.insertBefore(main, body.children[body.childElementCount - 7]);
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
    if (["textContent", "innerHTML"].includes(key)) {
      builtElement[key] = value;
    } else {
      builtElement.setAttribute(key, value);
    };
  };

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
