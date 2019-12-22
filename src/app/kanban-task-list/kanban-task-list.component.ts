import { Component, OnInit } from '@angular/core';
import { AddTaskComponent } from '../modal/add-task/add-task.component';
import { MatDialog } from '@angular/material';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../model/task';
import { KanbanService } from '../service/kanban.service';

@Component({
  selector: 'app-kanban-task-list',
  templateUrl: './kanban-task-list.component.html',
  styleUrls: ['./kanban-task-list.component.css']
})
export class KanbanTaskListComponent implements OnInit {
  constructor(private kanbanService:KanbanService,
    public dialog: MatDialog) {
      this.taskAdd=new Task;
    }
  task:Task[];
  taskAdd:Task;
  taskToDo=[];
  taskDo=[];
  taskDone=[];
  ngOnInit() {
    this.kanbanService.findAll().subscribe(res=>{
      this.task=res;
      for(let d of this.task){
        if(d.taskTable=="todo") this.taskToDo.push(d);
        if(d.taskTable=="do")this.taskDo.push(d);
        if(d.taskTable=="done") this.taskDone.push(d);
      }
    });
  }
  addTask(table):void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
    width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=undefined){
        if(result.invalid){
          window.alert("Please correct all errors and resubmit add task");
        }
        else{
          this.taskAdd.taskTitle=result.value.task.title;
          this.taskAdd.taskTable=table;
          this.kanbanService.addTask(this.taskAdd).subscribe();
        }
      }
    });
  }
  deleteTask(id){
    this.kanbanService.deleteTask(id).subscribe()
  }
  save(){
    for(let d of this.taskDo){
      d.taskTable="do"
      this.kanbanService.addTask(d).subscribe()
    }
    for(let d of this.taskDone){
      d.taskTable="done"
      this.kanbanService.addTask(d).subscribe()
    }
    for(let d of this.taskToDo){
      d.taskTable="todo"
      this.kanbanService.addTask(d).subscribe()
    }
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    else {
      transferArrayItem(event.previousContainer.data,event.container.data,event.previousIndex,event.currentIndex);
      this.save();
    }
  }
}
