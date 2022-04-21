let myCurrentList = '<h2>{title}</h2> <ul id = "parentUl" class = "parentUl">';

function createList(title, list) {
  document.body.innerHTML = myCurrentList;
  for (let item of list) {
    myCurrentList += `<li><span>${item.value}`;
    let currentChild = item.children;
    if (currentChild) {
      item = currentChild;
      myCurrentList += '<ul class = "childUl" >';
      createList(title, item);
    }
    myCurrentList += "</span></li>";
  }
  myCurrentList += "</ul>";

  myCurrentList = myCurrentList.replace("{title}", `${title}`);

  document.body.style.fontSize = "1.5rem";
  document.body.innerHTML = myCurrentList;
  let UlList = document.getElementsByClassName("childUl");

  for (let node of UlList) {
    node.style.fontSize = "0.9em";
  }
}

const list1 = [
  {
    value: "Пункт 1.",
    children: null,
  },
  {
    value: "Пункт 2.",
    children: [
      {
        value: "Подпункт 2.1.",
        children: [
          {
            value: "Подпункт 2.1.1.",
            children: null,
          },
          {
            value: "Подпункт 2.1.2.",
            children: null,
          },
        ],
      },
      {
        value: "Подпункт 2.2.",
        children: [
          {
            value: "Подпункт 2.2.1.",
            children: null,
          },
          {
            value: "Подпункт 2.2.2.",
            children: null,
          },
        ],
      },
      {
        value: "Подпункт 2.3.",
        children: null,
      },
    ],
  },
  {
    value: "Пункт 3.",
    children: null,
  },
];

createList("Список", list1);

let parentUl = document.getElementById("parentUl");

for (let li of parentUl.querySelectorAll("li")) {
  let span = document.createElement("span");
  li.prepend(span);
  span.append(span.nextSibling);
}

parentUl.onclick = function (event) {
  if (event.target.tagName != "SPAN") {
    return;
  }

  let childrenContainer = event.target.parentNode.querySelector("ul");
  if (!childrenContainer) return;

  childrenContainer.hidden = !childrenContainer.hidden;
};

