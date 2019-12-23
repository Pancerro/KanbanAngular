import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KanbanTaskListComponent } from './kanban-task-list/kanban-task-list.component';
import { AddTaskComponent } from './kanban-task/add-task/add-task.component';


const routes: Routes = [
  { path: '', redirectTo: '/welcome-page', pathMatch: 'full'},
  {path: 'welcome-page', component: KanbanTaskListComponent},
  {path: 'add-task-page/:titleTable', component: AddTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
