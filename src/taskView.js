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
  }
}

export { getTasks };
