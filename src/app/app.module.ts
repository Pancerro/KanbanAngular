import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KanbanTaskListComponent } from './kanban-task-list/kanban-task-list.component';
import { MatFormFieldModule,  MatDialogModule,MatInputModule, MatButtonModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { AddTaskComponent } from './modal/add-task/add-task.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { KanbanService } from './service/kanban.service';
@NgModule({
  entryComponents:[AddTaskComponent],
  declarations: [
    AppComponent,
    KanbanTaskListComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    DragDropModule
  ],
  providers: [KanbanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
