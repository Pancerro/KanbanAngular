import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class KanbanServiceService {
  private kanbanUrl:string
  constructor(private http:HttpClient) {
    this.kanbanUrl='http://localhost:8080/kanban';
   }
   public findAll():Observable<any[]>{
      return this.http.get<any[]>(this.kanbanUrl);
   }
   public addTask(task:Task){
     this.kanbanUrl=='http://localhost:8080/kanban';
     return this.http.post<Task>(this.kanbanUrl,task);
   }
   public deleteTask(id:number){
     this.kanbanUrl='http://localhost:8080/kanban/'+id;
     return this.http.delete(this.kanbanUrl);
   }
}
