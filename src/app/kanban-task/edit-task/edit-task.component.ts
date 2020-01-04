import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { KanbanTaskListComponent } from 'src/app/kanban-task-list/kanban-task-list.component';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent{
  edit:boolean=true;
  constructor(
    public dialogRef: MatDialogRef<KanbanTaskListComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }
  editTask():void{
    this.edit=!this.edit;
  }
}
