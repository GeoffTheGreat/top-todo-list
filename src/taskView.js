import { isWithinInterval, addDays } from "date-fns";
function getTasks(filter) {
  if (localStorage.getItem("tasks") !== null) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let today = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    };
    let returnTasks = [];
    switch (filter) {
      case "home":
        return tasks;

      case "today":
        for (let i = 0; i < tasks.length; i++) {
          let tempDate = tasks[i].dueDate.split("-");
          if (
            tempDate[0] == today.year &&
            tempDate[1] == today.month &&
            tempDate[2] == today.day
          ) {
            returnTasks.push(tasks[i]);
          }
        }
        return returnTasks;
      case "thisWeek":
        for (let i = 0; i < tasks.length; i++) {
          let weekFromNow = addDays(new Date(), 7);
          let yesterDay = addDays(new Date(), -1);
          let tempDate = tasks[i].dueDate.split("-");
          if (
            isWithinInterval(
              new Date(
                parseInt(tempDate[0]),
                parseInt(tempDate[1]) - 1,
                parseInt(tempDate[2])
              ),
              { start: yesterDay, end: weekFromNow }
            )
          ) {
            returnTasks.push(tasks[i]);
          }
        }

        return returnTasks;
      default:
        break;
    }
    if (filter.includes("span")) {
      filter = filter.replace("span", "");
      let projectList = JSON.parse(localStorage.getItem("projects"));
      let project = projectList[parseInt(filter)];
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].project == project) {
          returnTasks.push(tasks[i]);
        }
      }

      return returnTasks;
    }
  } else {
    return [];
  }
}

function setPriorities(toDisplay) {
  for (let i = 0; i < toDisplay.length; i++) {
    let priority = toDisplay[i].priority;

    let task = document.getElementById(`task${toDisplay[i].taskId}-title`);
    switch (priority) {
      case "low":
        task.classList.add("low");
        break;
      case "medium":
        task.classList.add("medium");

        break;
      case "high":
        task.classList.add("high");
        break;
    }
  }
}
function getTaskToEdit(taskId) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  let task;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId == taskId) {
      task = tasks[i];
    }
  }
  return task;
}
function removeTask(e) {
  let taskId = e.target.id;
  taskId = taskId.replace("task", "");
  taskId = taskId[0];
  document.getElementById(`task${taskId}`).remove();
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId == taskId) {
      tasks.splice(i, 1);
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function displayTasks(toDisplay) {
  let toAppend = "";
  for (let i = 0; i < toDisplay.length; i++) {
    toAppend += `<div class="aTask" id="task${toDisplay[i].taskId}">
    <input type="checkbox" name="task${toDisplay[i].taskId}-check" id="task${toDisplay[i].taskId}-check" class="taskCheck pointer">
    <p class="taskTitle pointer" id="task${toDisplay[i].taskId}-title">${toDisplay[i].title}</p>
    <p class="taskDueDate" id="task${toDisplay[i].taskId}-dueDate">${toDisplay[i].dueDate}</p>
    <i class="fa-solid fa-pen-to-square pointer taskEdit" id="task${toDisplay[i].taskId}-edit"></i>
    <i class="fa-solid fa-trash-can pointer taskRemove" id="task${toDisplay[i].taskId}-delete" ></i>
    <p class="taskNotes" id="task${toDisplay[i].taskId}-notes">Notes: ${toDisplay[i].notes}</p>
    </div>`;
  }
  return toAppend;
}

export { getTasks, displayTasks, setPriorities, getTaskToEdit, removeTask };
