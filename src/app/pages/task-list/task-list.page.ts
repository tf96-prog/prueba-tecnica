import { Component, OnInit } from '@angular/core';
import { TaskService, Tarea } from '../../services/task.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {

  tasks: Tarea[] = [];
  filter: string = 'all'; 
  filteredTasks: Tarea[] = [];
  searchTerm: string = ''; 

  constructor(private taskService: TaskService,private navCtrl: NavController) {
    
  }

  ngOnInit() {
    this.updateFilteredTasks();
  }

  
  updateFilteredTasks() {
    const allTasks = this.taskService.getTasks();
    if (this.filter === 'completed') {
      this.filteredTasks = allTasks.filter(task => task.completado);
    } else if (this.filter === 'pending') {
      this.filteredTasks = allTasks.filter(task => !task.completado);
    } else {
      this.filteredTasks = allTasks;
    }
  }

  
  toggleTaskCompletion(task: Tarea) {
    task.completado = !task.completado;
    this.taskService.updateTask(task);
    this.updateFilteredTasks();
  }

  // Edita una tarea existente
  editTask(task: Tarea) {
    
    this.navCtrl.navigateForward(`/pages/task-form/${task.id}`);
  }

  
  deleteTask(id: number) {
    this.taskService.deleteTask(id);
    this.updateFilteredTasks();
  }

  
  addTask() {
    
    this.navCtrl.navigateForward('/pages/task-form');
  }

  filterTasks() {
    const term = this.searchTerm.toLowerCase();
    this.filteredTasks = this.tasks.filter(task => 
      task.titulo.toLowerCase().includes(term)
    );
  }

}
