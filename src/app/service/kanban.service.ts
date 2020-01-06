import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../model/task';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  private kanbanUrl:string
  constructor(private http:HttpClient) {
    //this.kanbanUrl='https://kanban-server-springboot.herokuapp.com/kanban';
    this.kanbanUrl='http://localhost:8080/kanban';
   }
   public findAll():Observable<Task[]>{
    //this.kanbanUrl='https://kanban-server-springboot.herokuapp.com/kanban';
    this.kanbanUrl='http://localhost:8080/kanban';
      return this.http.get<Task[]>(this.kanbanUrl);
   }
   public addTask(task:Task):boolean{
    //this.kanbanUrl=='https://kanban-server-springboot.herokuapp.com/kanban';
    this.kanbanUrl='http://localhost:8080/kanban';
     if( this.http.post<Task>(this.kanbanUrl,task).subscribe()) return true;
     else return false;
   }
   public deleteTask(id:number): Observable<any>{
    //this.kanbanUrl='https://kanban-server-springboot.herokuapp.com/kanban/'+id;
    this.kanbanUrl='http://localhost:8080/kanban/'+id;
     return this.http.delete(this.kanbanUrl);
   }
   public findAllUser():Observable<User[]>{
    //this.kanbanUrl='https://kanban-server-springboot.herokuapp.com/kanban/user';
    this.kanbanUrl='http://localhost:8080/kanban/user';
    return this.http.get<User[]>(this.kanbanUrl);
   }
   public addUser(user:User):boolean{
    //this.kanbanUrl=='https://kanban-server-springboot.herokuapp.com/kanban/user/add';
    this.kanbanUrl='http://localhost:8080/kanban/user/add';
     if(this.http.post<User>(this.kanbanUrl,user).subscribe()) return true;
     else return false;
   }
   public findAllTaskByUser(userId:number):Observable<Task[]>{
    //this.kanbanUrl='https://kanban-server-springboot.herokuapp.com/kanban/user/task';
    this.kanbanUrl='http://localhost:8080/kanban/user/task';
    return this.http.post<Task[]>(this.kanbanUrl,userId);
   }
}
