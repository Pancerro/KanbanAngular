import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../model/task';
import { KanbanService } from '../service/kanban.service';
import { Router } from '@angular/router';
import { EditTaskComponent } from '../kanban-task/edit-task/edit-task.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { User } from '../model/user';
import { AddUserComponent } from '../kanban-task/add-user/add-user.component';

@Component({
  selector: 'app-kanban-task-list',
  templateUrl: './kanban-task-list.component.html',
  styleUrls: ['./kanban-task-list.component.css'],
})
export class KanbanTaskListComponent implements OnInit {
  constructor(
    private kanbanService:KanbanService,
    public router:Router,
    public dialog: MatDialog) {}
  task:Task[];
  taskAdd:Task;
  userAdd:User;
  taskToDo=[];
  taskDo=[];
  taskDone=[];
  taskUser=[]
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
    data: {title: item.taskTitle, description: item.taskText, priority:item.taskPriority, username:item.taskUsername}
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
          this.taskEdit.taskUsername=result.value.task.user;
          this.taskEdit.taskTable=table;
          if(item.taskTable=="todo"){
          this.taskToDo.filter(function (task){
           if( task.id==item.id){
             task.taskTitle=result.value.task.title;
             task.taskText=result.value.task.description;
             task.taskPriority=result.value.task.priority;
             task.taskUsername=result.value.task.user;
           } 
          })
        }
        if(item.taskTable=="do"){
          this.taskDo.filter(function (task){
           if( task.id==item.id){
             task.taskTitle=result.value.task.title;
             task.taskText=result.value.task.description;
             task.taskPriority=result.value.task.priority;
             task.taskUsername=result.value.task.user;
           } 
          })
        }
        if(item.taskTable=="done"){
          this.taskDone.filter(function (task){
           if( task.id==item.id){
             task.taskTitle=result.value.task.title;
             task.taskText=result.value.task.description;
             task.taskPriority=result.value.task.priority;
             task.taskUsername=result.value.task.user;
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
  addUser():void{
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '350px'
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result!=undefined)
        {
          if(result.invalid){
            window.alert("Please correct all errors and resubmit update task");
          }
          else{
          this.userAdd=new User;
          this.userAdd.username=result.value.username.user;
           this.kanbanService.addUser(this.userAdd);
          }
          }
        });
    }
    searchUser:String;
    foundUser:String;
  getTaskByUser(username):void{
    this.taskUser=[]; 
    this.searchUser=username;
    this.searchUser=this.searchUser.toLowerCase(); 
    for(let item of this.taskToDo){
      this.foundUser=item.taskUsername;
      this.foundUser=this.foundUser.toLowerCase();
      if(this.foundUser==this.searchUser) this.taskUser.push(item);
    }
    for(let item of this.taskDo){
      this.foundUser=item.taskUsername;
      this.foundUser=this.foundUser.toLowerCase();
      if(this.foundUser==this.searchUser) this.taskUser.push(item);
    }
    for(let item of this.taskDone){
      this.foundUser=item.taskUsername;
      this.foundUser=this.foundUser.toLowerCase();
      if(this.foundUser==this.searchUser) this.taskUser.push(item);
    }
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
