import todoLogo from "./assets/todo.svg";

function setHeader() {
  const header = document.getElementById("mainHeader");

  const logoDiv = document.createElement("div");
  logoDiv.classList.add("logo--div");
  const headLogo = document.createElement("img");
  headLogo.src = todoLogo;
  headLogo.classList.add("logo");
  logoDiv.appendChild(headLogo);
  const headText = document.createElement("h1");
  headText.textContent = "TODO";
  logoDiv.appendChild(headText);

  header.appendChild(logoDiv);

  const addTask = document.createElement("button");
  addTask.setAttribute("id", "addTask");
  addTask.classList.add("add--task");
  addTask.textContent = "+ Add task";
  header.appendChild(addTask);
}

export default setHeader;
