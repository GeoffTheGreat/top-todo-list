function navTree() {
  const tree = document.getElementById("todoTree");

  const homeIcon = document.createElement("i");
  homeIcon.classList.add("fa-solid", "fa-house");
  tree.appendChild(homeIcon);

  const homeText = document.createElement("p");
  homeText.setAttribute("id", "home");
  homeText.classList.add("pointer");
  homeText.textContent = `Home`;

  tree.appendChild(homeText);

  const todayIcon = document.createElement("i");
  todayIcon.classList.add("fa-solid", "fa-calendar-day");
  tree.appendChild(todayIcon);

  const todayText = document.createElement("p");
  todayText.setAttribute("id", "today");
  todayText.classList.add("pointer");
  todayText.textContent = "Today";
  tree.appendChild(todayText);

  const thisWeekIcon = document.createElement("i");
  thisWeekIcon.classList.add("fa-solid", "fa-calendar-week");
  tree.appendChild(thisWeekIcon);

  const thisWeekText = document.createElement("p");
  thisWeekText.setAttribute("id", "thisWeek");
  thisWeekText.classList.add("pointer");
  thisWeekText.textContent = "This Week";
  tree.appendChild(thisWeekText);

  const projectHeading = document.createElement("h2");
  projectHeading.classList.add("project--heading");

  projectHeading.textContent = "Projects";
  tree.appendChild(projectHeading);

  const projectList = document.createElement("ul");
  projectList.classList.add("project--list");
  projectList.setAttribute("id", "projectList");
  tree.appendChild(projectList);

  const addNewProject = document.createElement("p");
  addNewProject.classList.add("new--project", "pointer");
  addNewProject.setAttribute("id", "newProject");
  addNewProject.textContent = "+ Add new Project";
  tree.appendChild(addNewProject);
}
export default navTree;
