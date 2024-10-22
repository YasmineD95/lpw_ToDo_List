import { Task } from "./task.js";
import { TaskManager } from "./taskManager.js";

// Récupère les éléments du DOM
const taskInput = document.getElementById("taskInput");
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const errorMessage = document.createElement("div");

errorMessage.classList.add("text-red-500", "mb-4", "hidden"); // hidden=caché par défaut
document.querySelector(".bg-white").insertBefore(errorMessage, taskList);

const taskManager = new TaskManager();

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskTitle = taskInput.value.trim();

  // si le champ de saisie est vide
  if (taskTitle === "") {
    errorMessage.textContent = "Veuillez entrer un titre de tâche.";
    errorMessage.classList.remove("hidden");
  } else {
    //si pas vide on le cache
    errorMessage.classList.add("hidden");

    //  une nouvelle tâche
    const newTask = new Task(taskTitle);

    taskManager.addTask(newTask);

    renderTasks();

    taskInput.value = "";
  }
});

//  pour afficher les tâches dans la liste
function renderTasks() {
  // Efface la liste actuelle
  taskList.innerHTML = "";

  // Parcourir les tâches et les ajouter à la liste
  taskManager.tasks.forEach((task) => {
    const taskElement = document.createElement("li");
    taskElement.innerHTML = `
      <label class="flex items-center">
        <input type="checkbox" class="mr-2" ${
          task.isCompleted ? "checked" : ""
        } data-id="${task.id}">
        <span class="${task.isCompleted ? "line-through text-gray-400" : ""}">${
      task.title
    }</span>
        <button class="btn-delete ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" data-id="${
          task.id
        }">Supprimer</button>
      </label>
    `;
    // marquer une tâche comme complétée
    const checkbox = taskElement.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", () => {
      const taskId = parseInt(checkbox.getAttribute("data-id"));
      taskManager.toggleCompletion(taskId);
      renderTasks();
    });

    // pour supprimer une tâche
    const deleteButton = taskElement.querySelector(".btn-delete");
    deleteButton.addEventListener("click", () => {
      const taskId = parseInt(deleteButton.getAttribute("data-id"));
      taskManager.removeTask(taskId);
      renderTasks();
    });

    taskList.appendChild(taskElement);
  });
}

renderTasks();
