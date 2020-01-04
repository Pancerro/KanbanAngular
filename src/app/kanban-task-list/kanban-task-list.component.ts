import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../model/task';
import { KanbanService } from '../service/kanban.service';
import { Router } from '@angular/router';
import { EditTaskComponent } from '../kanban-task/edit-task/edit-task.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-kanban-task-list',
  templateUrl: './kanban-task-list.component.html',
  styleUrls: ['./kanban-task-list.component.css'],
  animations: [
    trigger('itemAnim', [
      transition(':leave', [
      style({
      backgroundColor: 'red',
      opacity: 1}),
      animate('0.5s ease-in')
      ])
      ])]
})
export class KanbanTaskListComponent implements OnInit {
  constructor(private kanbanService:KanbanService,
    public router:Router,
    public dialog: MatDialog,) {}
  task:Task[];
  taskAdd:Task;
  taskToDo=[];
  taskDo=[];
  taskDone=[];
  taskEdit:Task;
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
  editTask(item:Task,table:string):void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
    width: '350px',
    data: {title: item.taskTitle, description: item.taskText, priority:item.taskPriority}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=undefined)
      {
        if(result.invalid.title){
          window.alert("Please correct all errors and resubmit update task");
        }
        else{  
          this.taskEdit=new Task;
          this.taskEdit.id=item.id;
          this.taskEdit.taskTitle=result.value.task.title;
          this.taskEdit.taskText=result.value.task.description;
          this.taskEdit.taskPriority=result.value.task.priority;
          this.taskEdit.taskTable=table;
          if(item.taskTable=="todo"){
          this.taskToDo.filter(function (task){
           if( task.id==item.id){
             task.taskTitle=result.value.task.title;
             task.taskText=result.value.task.description;
             task.taskPriority=result.value.task.priority;
           } 
          })
        }
        if(item.taskTable=="do"){
          this.taskDo.filter(function (task){
           if( task.id==item.id){
             task.taskTitle=result.value.task.title;
             task.taskText=result.value.task.description;
             task.taskPriority=result.value.task.priority;
           } 
          })
        }
        if(item.taskTable=="done"){
          this.taskDone.filter(function (task){
           if( task.id==item.id){
             task.taskTitle=result.value.task.title;
             task.taskText=result.value.task.description;
             task.taskPriority=result.value.task.priority;
           } 
          })
        }
          this.kanbanService.addTask(this.taskEdit);
        }
      }
    });
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
