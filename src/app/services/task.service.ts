import { Injectable } from '@angular/core';

export interface Tarea{

  id: number;
  titulo: string;
  descripcion?: string;
  completado: boolean;

}


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Tarea[] = [];

  constructor() {
    this.loadTasks();
  }

  loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  getTasks(filter?: string): Tarea[] {
    return filter ? this.tasks.filter(task => task.completado === (filter === 'completed')) : this.tasks;
  }

  addTask(task: Tarea) {
    task.id = Date.now();
    this.tasks.push(task);
    this.saveTasks();
  }

  updateTask(updatedTask: Tarea) {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.saveTasks();
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks();
  }

  getTaskById(id: number): Tarea | undefined {
    return this.tasks.find(task => task.id === id);
  }

}
