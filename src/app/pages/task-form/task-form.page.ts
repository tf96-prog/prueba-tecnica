import { Component, OnInit } from '@angular/core';
import { TaskService, Tarea } from '../../services/task.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.scss'],
})
export class TaskFormPage implements OnInit {

  isEditing: boolean = false; 
  tarea: Tarea = { id: 0, titulo: '', descripcion: '', completado: false }; 

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      const taskAEditar = this.taskService.getTaskById(+id);
      if (taskAEditar) {
        this.tarea = { ...taskAEditar }; // Rellena el formulario con la tarea existente
      }
    }
    
  }

  saveTask() {
    if (this.isEditing) {
      this.taskService.updateTask(this.tarea); 
    } else {
      this.taskService.addTask(this.tarea); 
    }
    this.navCtrl.navigateBack('/pages/task-list');
  }

}
