import "./styles/main.css";
import setHeader from "./header.js";
import navTree from "./navTree.js";
import { displayTaskForm, addTask, clearTaskForm, newTask } from "./addTask.js";
import {
  newProject,
  indexOfProject,
  updateProjects,
  displayProjectForm,
  clearProjectForm,
  deleteProjectItem,
} from "./addProject.js";

setHeader();
navTree();
updateProjects();

const home = document.getElementById("home");
home.addEventListener("click", displayProjectSet);

const today = document.getElementById("today");
today.addEventListener("click", displayProjectSet);

const thisWeek = document.getElementById("thisWeek");
thisWeek.addEventListener("click", displayProjectSet);

const addTaskBtn = document.getElementById("addTask");
addTaskBtn.addEventListener("click", displayTaskForm);

const addTaskSubmit = document.getElementById("addTaskSubmit");
addTaskSubmit.addEventListener("click", assignTask);

const addTaskCancel = document.getElementById("addTaskCancel");
addTaskCancel.addEventListener("click", clearTaskForm);

const newProjectBtn = document.getElementById("newProject");
newProjectBtn.addEventListener("click", displayProjectForm);

const projectSubmitBtn = document.getElementById("addProjectSubmit");
projectSubmitBtn.addEventListener("click", projectFormValidation);

const projectCancelBtn = document.getElementById("addProjectCancel");
projectCancelBtn.addEventListener("click", clearProjectForm);

updateListEventListener();

function assignTask() {
  let task = addTask();
  if (task !== null) {
    newTask(task);
  }
}

function projectFormValidation() {
  const project = document.getElementById("projectFormInput");
  if (project.value !== "") {
    newProject(project.value);
    updateProjects();
    updateListEventListener();
    clearProjectForm();
  }
}
function updateListEventListener() {
  const projectItems = Array.from(document.querySelectorAll(".projectItem"));
  projectItems.forEach((item) => {
    item.addEventListener("click", displayProjectSet);
  });
  const deleteProject = Array.from(document.querySelectorAll(".fa-li"));
  deleteProject.forEach((item) => {
    item.addEventListener("click", deleteThisProject);
  });
}

function deleteThisProject(e) {
  deleteProjectItem(e);
  updateListEventListener();
}
function displayProjectSet(e) {
  alert(e.target.id);
  console.log(e);
}
