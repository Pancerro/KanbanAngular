import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  private kanbanUrl:string
  constructor(private http:HttpClient) {
    this.kanbanUrl='https://kanban-server-springboot.herokuapp.com/kanban';
   }
   public findAll():Observable<any[]>{
      return this.http.get<any[]>(this.kanbanUrl);
   }
   public addTask(task:Task){
     this.kanbanUrl=='https://kanban-server-springboot.herokuapp.com/kanban';
     return this.http.post<Task>(this.kanbanUrl,task);
   }
   public deleteTask(id:number){
     this.kanbanUrl='https://kanban-server-springboot.herokuapp.com/kanban/'+id;
     return this.http.delete(this.kanbanUrl);
   }
}
