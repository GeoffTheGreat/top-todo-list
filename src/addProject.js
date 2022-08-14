function displayProjectForm() {
  const projectForm = document.getElementById("addProjectForm");
  projectForm.style.display = "flex";
}
function clearProjectForm() {
  document.getElementById("projectFormInput").value = "";

  const projectForm = document.getElementById("addProjectForm");
  projectForm.style.display = "none";
}

function newProject(project) {
  let projects;
  if (localStorage.getItem("projects") !== null) {
    if (indexOfProject(project) < 0 && project.trim() !== "") {
      projects = JSON.parse(localStorage.getItem("projects"));
      projects.push(project);
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  } else {
    projects = [project];
    localStorage.setItem("projects", JSON.stringify(projects));
  }
}

function indexOfProject(project) {
  let projects = JSON.parse(localStorage.getItem("projects"));
  return projects.indexOf(project);
}

function updateProjects() {
  const projectList = document.getElementById("projectList");

  let projects = JSON.parse(localStorage.getItem("projects"));
  let project = "";
  if (projects !== null) {
    for (let i = 0; i < projects.length; i++) {
      project += `<li id="project${i}" class="pointer"><span class="fa-li pointer fa-regular fa-trash-can"></span>     <span id="span${i}"class="projectItem pointer">${projects[i]}</span></li>`;
    }

    projectList.innerHTML = project;
  }
}
function updateProjectsFromTasks() {
  let projects = JSON.parse(localStorage.getItem("projects"));
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  for (let i = 0; i < tasks.length; i++) {
    if (
      tasks[i].project.trim() !== "" &&
      projects.indexOf(tasks[i].project) < 0
    ) {
      projects.push(tasks[i].project);
    }
  }
  localStorage.setItem("projects", JSON.stringify(projects));
}
function deleteProjectItem(e) {
  const listParent = e.target.parentNode.id;
  const toDelete = listParent[listParent.length - 1];
  let projects = JSON.parse(localStorage.getItem("projects"));
  projects.splice(toDelete, 1);
  console.log(projects);
  localStorage.setItem("projects", JSON.stringify(projects));
  updateProjects();
}

export {
  newProject,
  indexOfProject,
  updateProjects,
  displayProjectForm,
  clearProjectForm,
  deleteProjectItem,
  updateProjectsFromTasks,
};
