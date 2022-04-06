let myCurrentList = '<h2>{title}</h2> <ul id = "parentUl">';

function createList(title, list) {
  document.body.innerHTML = myCurrentList;
  for (let item of list) {
    myCurrentList += `<li>${item.value}`;
    let currentChild = item.children;
    if (currentChild) {
      item = currentChild;
      myCurrentList += '<ul class = "childUl" >';
      createList(title, item);
    }
    myCurrentList += "</li>";
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

// const list = [
//   {
//     value: "Пункт 1.",
//     children: null,
//   },
//   {
//     value: "Пункт 2.",
//     children: [
//       {
//         value: "Подпункт 2.1.",
//         children: null,
//       },
//       {
//         value: "Подпункт 2.2.",
//         children: [
//           {
//             value: "Подпункт 2.2.1.",
//             children: [
//               {
//                 value: "Подпункт 2.2.1.1.",
//                 children: null,
//               },
//               {
//                 value: "Подпункт 2.2.1.2.",
//                 children: null,
//               },
//               {
//                 value: "Подпункт 2.2.1.3.",
//                 children: [
//                   {
//                     value: "Подпункт 2.2.1.3.1.",
//                     children: [
//                       {
//                         value: "Подпункт 2.2.1.3.1.1.",
//                         children: null,
//                       },
//                       {
//                         value: "Подпункт 2.2.1.3.1.2.",
//                         children: null,
//                       },
//                       {
//                         value: "Подпункт 2.2.1.3.1.3.",
//                         children: [
//                           {
//                             value: "Подпункт 2.2.1.3.1.3.1.",
//                             children: null,
//                           },
//                           {
//                             value: "Подпункт 2.2.1.3.1.3.2.",
//                             children: null,
//                           },
//                           {
//                             value: "Подпункт 2.2.1.3.1.3.3.",
//                             children: null,
//                           },
//                         ],
//                       },
//                     ],
//                   },
//                   {
//                     value: "Подпункт 2.2.1.3.2.",
//                     children: null,
//                   },
//                   {
//                     value: "Подпункт 2.2.1.3.3.",
//                     children: null,
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             value: "Подпункт 2.2.2.",
//             children: null,
//           },
//         ],
//       },
//       {
//         value: "Подпункт 2.3.",
//         children: null,
//       },
//     ],
//   },
//   {
//     value: "Пункт 3.",
//     children: null,
//   },
//   {
//     value: "Пункт 4.",
//     children: null,
//   },
// ];

// createList('Task 5.2', list);
