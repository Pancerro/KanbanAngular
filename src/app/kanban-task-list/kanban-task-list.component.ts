import { Component, OnInit } from '@angular/core';
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
    this.router.navigate(['/add-task-page/'+table]);
  }
  deleteTask(task:Task):void{
    if(task.taskTable=="todo") this.taskToDo.splice(this.taskToDo.indexOf(task),1);
    if(task.taskTable=="do")   this.taskDo.splice(this.taskDo.indexOf(task),1);
    if(task.taskTable=="done") this.taskDone.splice(this.taskDone.indexOf(task),1);
    this.kanbanService.deleteTask(task.id).subscribe();
  } 

  save():void{
    for(let d of this.taskDo){
      d.taskTable="do"
      this.kanbanService.addTask(d);
    }
    for(let d of this.taskDone){
      d.taskTable="done"
      this.kanbanService.addTask(d);
    }
    for(let d of this.taskToDo){
      d.taskTable="todo"
      this.kanbanService.addTask(d);
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
