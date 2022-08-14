function displayTaskForm() {
  const taskForm = document.getElementById("addTaskForm");
  taskForm.style.display = "flex";
}

function clearTaskForm() {
  document.getElementById("taskTitle").value = "";
  document.getElementById("notes").value = "";
  document.getElementById("dueDate").value = "";
  document.getElementById("priority").value = "low";
  document.getElementById("projectAddTaskForm").value = "";
  const taskForm = document.getElementById("addTaskForm");
  taskForm.style.display = "none";
}

function addTask() {
  const taskTitle = document.getElementById("taskTitle");
  const notes = document.getElementById("notes");
  const dueDate = document.getElementById("dueDate");
  const priority = document.getElementById("priority");
  const project = document.getElementById("projectAddTaskForm");
  if (taskTitle.value === "") {
    alert(`Title can't be empty `);
  }
  if (dueDate.value === "") {
    alert(`Due date can't be empty `);
  }
  if (dueDate.value.trim() !== "" && taskTitle.value.trim() !== "") {
    let task = {
      title: taskTitle.value,
      notes: notes.value,
      dueDate: dueDate.value,
      priority: priority.value,
      project: project.value,
      completed: false,
    };
    clearTaskForm();
    return task;
  } else {
    return null;
  }
}
function displayEditForm(taskToEdit) {
  const taskForm = document.getElementById("addTaskForm");
  taskForm.style.display = "flex";
  const taskTitle = document.getElementById("taskTitle");
  taskTitle.value = taskToEdit.title;
  const notes = document.getElementById("notes");
  notes.value = taskToEdit.notes;

  const dueDate = document.getElementById("dueDate");
  dueDate.value = taskToEdit.dueDate;
  const priority = document.getElementById("priority");
  priority.value = taskToEdit.priority;
  const project = document.getElementById("projectAddTaskForm");
  project.value = taskToEdit.project;
}

function newTask(task) {
  let taskList = [];
  if (localStorage.getItem("tasks") !== null) {
    taskList = JSON.parse(localStorage.getItem("tasks"));

    taskList.push(task);
    for (let i = 0; i < taskList.length; i++) {
      taskList[i].taskId = i;
    }

    localStorage.setItem("tasks", JSON.stringify(taskList));
  } else {
    task.taskId = taskList.length;

    taskList.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }
}

export { displayTaskForm, addTask, clearTaskForm, newTask, displayEditForm };
