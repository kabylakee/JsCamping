function createCalendar(elem, year, month) {
  let date = new Date(year, month - 1);
  let firstDayOfW = date.getDay() ? date.getDay() - 1 : 7;
  const monthName = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабря",
  ];
  let monthDays = date.monthDays();
  let table = `
    <table id="table" border = "1">
     <tr bgcolor="gray">
     <th>пн</th>
     <th>вт</th>
     <th>ср</th>
     <th>чт</th>
     <th>пт</th>
     <th>сб</th>
     <th>вс</th>
    </tr><tr>`;

  if (firstDayOfW !== 7) {
    for (let i = 0; i < firstDayOfW; i++) {
      table += "<td></td>";
    }
  }

  for (let i = firstDayOfW; i <= monthDays + firstDayOfW - 1; i++) {
    table += `<td>${i - firstDayOfW + 1}</td>`;
    if (i % 7 === 6) {
      table += "</tr><tr>";
    }
  }
  if ((firstDayOfW + monthDays) % 7 !== 0) {
    for (let i = 0; i < 7 - ((firstDayOfW + monthDays) % 7); i++) {
      table += "<td></td>";
    }
  }

  table += "</tr></table>";

  const infoMonthYear = document.createElement("div");
  const container = document.createElement("div");

  container.setAttribute("id", `${elem}`);
  infoMonthYear.textContent = `${monthName[month - 1]} ${year} год`;
  document.body.appendChild(infoMonthYear);
  document.body.appendChild(container);
  container.innerHTML = table + "<br>";
}

Date.prototype.monthDays = function () {
  return 35 - new Date(this.getFullYear(), this.getMonth(), 35).getDate();
};

createCalendar("elem1", 2022, 3);
createCalendar("elem2", 2021, 11);
createCalendar("elem4", 2012, 9);
