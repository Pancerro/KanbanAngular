import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { KanbanTaskListComponent } from 'src/app/kanban-task-list/kanban-task-list.component';
import { KanbanService } from 'src/app/service/kanban.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit{
  edit:boolean=true;
  user=[]
  constructor(
    private kanbanService:KanbanService,
    public dialogRef: MatDialogRef<KanbanTaskListComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }
  ngOnInit() {
    this.kanbanService.findAllUser().subscribe(res=>{
      this.user=res;
    });
}
  editTask():void{
    this.edit=!this.edit;
  }
}
