function navTree() {
  const tree = document.getElementById("todoTree");

  const homeIcon = document.createElement("i");
  homeIcon.classList.add("fa-solid", "fa-house");
  tree.appendChild(homeIcon);

  const homeText = document.createElement("p");
  homeText.textContent = `Home`;
  tree.appendChild(homeText);

  const todayIcon = document.createElement("i");
  todayIcon.classList.add("fa-solid", "fa-calendar-day");
  tree.appendChild(todayIcon);

  const todayText = document.createElement("p");
  todayText.textContent = "Today";
  tree.appendChild(todayText);

  const thisWeekIcon = document.createElement("i");
  thisWeekIcon.classList.add("fa-solid", "fa-calendar-week");
  tree.appendChild(thisWeekIcon);

  const thisWeekText = document.createElement("p");
  thisWeekText.textContent = "This Week";
  tree.appendChild(thisWeekText);

  const projectHeading = document.createElement("h2");
}
export default navTree;
