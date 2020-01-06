import { Component, OnInit } from '@angular/core';
import { KanbanService } from 'src/app/service/kanban.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent  {
  table: string = "";
  taskAdd:Task;
  user=[]
  constructor(private kanbanService:KanbanService,
    public router:Router,
    private route: ActivatedRoute) { }
    ngOnInit() {
      this.route.paramMap.forEach(({params}:Params)=>{
          this.table = params['titleTable']
      })
      this.kanbanService.findAllUser().subscribe(res=>{
        this.user=res;
      });
  }
  cancel(){
    this.router.navigate(['/welcome-page']);
  }
  addTask(newTask){
    this.taskAdd=new Task;
    this.taskAdd.taskTitle=newTask.value.taskTitle;
    this.taskAdd.taskTable=this.table;
    this.taskAdd.taskText=newTask.value.taskText;
    this.taskAdd.taskPriority=newTask.value.priority;
    this.taskAdd.taskUsername=newTask.value.user;
    this.kanbanService.addTask(this.taskAdd)
  }
}
