export class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  toggleCompletion(id) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.isCompleted = !task.isCompleted;
    }
  }
}
