import { Component,Inject } from '@angular/core';
import { KanbanTaskListComponent } from 'src/app/kanban-task-list/kanban-task-list.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { KanbanService } from 'src/app/service/kanban.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  constructor(
    public dialogRef: MatDialogRef<KanbanTaskListComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }


}
