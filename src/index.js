import "./styles/main.css";
import setHeader from "./header.js";
import navTree from "./navTree.js";
import {
  displayTaskForm,
  addTask,
  clearTaskForm,
  newTask,
  displayEditForm,
} from "./addTask.js";
import {
  newProject,
  indexOfProject,
  updateProjects,
  displayProjectForm,
  clearProjectForm,
  deleteProjectItem,
  updateProjectsFromTasks,
} from "./addProject.js";
import {
  getTasks,
  displayTasks,
  setPriorities,
  getTaskToEdit,
  removeTask,
  viewNotes,
  updateCompleted,
} from "./taskView";
setHeader();
navTree();

const home = document.getElementById("home");
home.addEventListener("click", displayProjectSet);

const today = document.getElementById("today");
today.addEventListener("click", displayProjectSet);

const thisWeek = document.getElementById("thisWeek");
thisWeek.addEventListener("click", displayProjectSet);

const addTaskBtn = document.getElementById("addTask");
addTaskBtn.addEventListener("click", newTaskProcess);

const addTaskCancel = document.getElementById("addTaskCancel");
addTaskCancel.addEventListener("click", clearTaskForm);

const newProjectBtn = document.getElementById("newProject");
newProjectBtn.addEventListener("click", displayProjectForm);

const projectSubmitBtn = document.getElementById("addProjectSubmit");
projectSubmitBtn.addEventListener("click", projectFormValidation);

const projectCancelBtn = document.getElementById("addProjectCancel");
projectCancelBtn.addEventListener("click", clearProjectForm);

if (localStorage.getItem("tasks") !== null) {
  updateProjectsFromTasks();
  let toDisplay = getTasks("home");
  document.getElementById("tasks").innerHTML = displayTasks(toDisplay);
  setPriorities(toDisplay);
  updateTaskEventListener();
}
updateProjects();
updateListEventListener();

function newTaskProcess() {
  displayTaskForm();
  const addTaskSubmit = document.getElementById("addTaskSubmit");
  addTaskSubmit.addEventListener("click", assignTask);
}

function assignTask(e) {
  let task = addTask();
  if (task !== null) {
    newTask(task);
    newProject(task.project);
    updateProjects();
    updateListEventListener();
    e.target.removeEventListener("click", assignTask);
  }
  let toDisplay = getTasks("home");
  document.getElementById("tasks").innerHTML = displayTasks(toDisplay);
  setPriorities(toDisplay);
}

function projectFormValidation() {
  const project = document.getElementById("projectFormInput");
  if (project.value.trim() !== "") {
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
function updateTaskEventListener() {
  const taskCheck = Array.from(document.getElementsByClassName("taskCheck"));
  taskCheck.forEach((check) => {
    check.addEventListener("change", setCompleted);
  });
  const titles = Array.from(document.getElementsByClassName("taskTitle"));
  titles.forEach((title) => {
    title.addEventListener("click", displayNotes);
  });
  const edits = Array.from(document.getElementsByClassName("taskEdit"));
  edits.forEach((edit) => {
    edit.addEventListener("click", editTask);
  });
  const deletes = Array.from(document.getElementsByClassName("taskRemove"));
  deletes.forEach((del) => {
    del.addEventListener("click", removeTask);
  });
}
function displayNotes(e) {
  viewNotes(e.target.id);
}
function deleteThisProject(e) {
  deleteProjectItem(e);
  updateListEventListener();
}
function displayProjectSet(e) {
  let toDisplay = getTasks(e.target.id);
  if (toDisplay.length > 0) {
    document.getElementById("tasks").innerHTML = displayTasks(toDisplay);
  } else {
    document.getElementById("tasks").innerHTML = "";
  }
  setPriorities(toDisplay);
  updateTaskEventListener();
}

function editTask(e) {
  let taskId = e.target.id;
  taskId = taskId.replace("task", "");
  taskId = taskId[0];
  let taskToEdit = getTaskToEdit(taskId);
  displayEditForm(taskToEdit);
  taskToUpdate = taskToEdit;
  const addTaskSubmit = document.getElementById("addTaskSubmit");
  addTaskSubmit.addEventListener("click", updateTask);
}
var taskToUpdate = {};
function updateTask(e) {
  e.target.removeEventListener("click", updateTask);

  let newInfo = addTask();
  let taskToUpdateInfo = taskToUpdate;
  taskToUpdateInfo.title = newInfo.title;
  taskToUpdateInfo.dueDate = newInfo.dueDate;
  taskToUpdateInfo.notes = newInfo.notes;
  taskToUpdateInfo.priority = newInfo.priority;
  taskToUpdateInfo.project = newInfo.project;
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId == taskToUpdateInfo.taskId) {
      tasks[i] = taskToUpdateInfo;
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateTaskDisplay();
}

function updateTaskDisplay() {
  updateProjectsFromTasks();
  let toDisplay = getTasks("home");
  document.getElementById("tasks").innerHTML = displayTasks(toDisplay);
  setPriorities(toDisplay);
  updateTaskEventListener();
  updateProjects();
  updateListEventListener();
}
function setCompleted(e) {
  console.log(e.target.checked);
  updateCompleted(e);
}
