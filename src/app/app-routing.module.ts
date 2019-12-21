import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KanbanTaskListComponent } from './kanban-task-list/kanban-task-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/welcome-page', pathMatch: 'full'},
  {path: 'welcome-page', component: KanbanTaskListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
