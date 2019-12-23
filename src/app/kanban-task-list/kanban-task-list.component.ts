import { Component, OnInit } from '@angular/core';
import { AddTaskComponent } from '../modal/add-task/add-task.component';
import { MatDialog } from '@angular/material';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../model/task';
import { KanbanService } from '../service/kanban.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kanban-task-list',
  templateUrl: './kanban-task-list.component.html',
  styleUrls: ['./kanban-task-list.component.css']
})
export class KanbanTaskListComponent implements OnInit {
  constructor(private kanbanService:KanbanService,
    public dialog: MatDialog,
    public router:Router) {}
  task:Task[];
  taskAdd:Task;
  taskToDo=[];
  taskDo=[];
  taskDone=[];
  ngOnInit():void {
    this.kanbanService.findAll().subscribe(res=>{
      this.task=res;
      for(let d of this.task){
        if(d.taskTable=="todo") this.taskToDo.push(d);
        if(d.taskTable=="do")   this.taskDo.push(d);
        if(d.taskTable=="done") this.taskDone.push(d);
      }
    });
  }
  addTask(table:string):void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
    width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=undefined){
        if(result.invalid){
          window.alert("Please correct all errors and resubmit add task");
        }
        else{
          console.log(this.task);
          this.taskAdd=new Task;
          this.taskAdd.taskTitle=result.value.task.title;
          this.taskAdd.taskTable=table;
          if(this.taskAdd.taskTable=="todo") this.taskToDo.push(this.taskAdd);
          if(this.taskAdd.taskTable=="do")   this.taskDo.push(this.taskAdd);
          if(this.taskAdd.taskTable=="done") this.taskDone.push(this.taskAdd);
          this.kanbanService.addTask(this.taskAdd).subscribe();
        }
      }
    });
  }
  deleteTask(task:Task):void{
    this.kanbanService.deleteTask(task.id).subscribe();
    if(task.taskTable=="todo") this.taskToDo.splice(this.taskToDo.indexOf(task),1);
    if(task.taskTable=="do")this.taskDo.splice(this.taskDo.indexOf(task),1);
    if(task.taskTable=="done") this.taskDone.splice(this.taskDone.indexOf(task),1);
  } 
  save():void{
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
  drop(event: CdkDragDrop<string[]>):void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    else {
      transferArrayItem(event.previousContainer.data,event.container.data,event.previousIndex,event.currentIndex);
      this.save();
    }
  }
}
