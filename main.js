// Classes Task et TaskManager
class Task {
  constructor(title) {
    this.title = title;
    this.id = Date.now();
  }
}

class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}

// Récupère les éléments du DOM
const taskInput = document.getElementById("taskInput");
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

const taskManager = new TaskManager();

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskTitle = taskInput.value.trim();

  if (taskTitle !== "") {
    // Créer une nouvelle tâche
    const newTask = new Task(taskTitle);

    // Ajouter la tâche
    taskManager.addTask(newTask);

    // Afficher les tâches dans html
    renderTasks();

    taskInput.value = "";
  } else {
    alert("Veuillez entrer un titre de tâche.");
  }
});

//  pour afficher les tâches dans la liste HTML
function renderTasks() {
  // Efface la liste actuelle
  taskList.innerHTML = "";

  // Parcourir  les tâches et les ajouter à la liste
  taskManager.tasks.forEach((task) => {
    const taskElement = document.createElement("li");
    taskElement.innerHTML = `
          <span>${task.title}</span>
          <button class="btn-delete" data-id="${task.id}">Supprimer</button>
      `;

    // supprimer une tache
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
