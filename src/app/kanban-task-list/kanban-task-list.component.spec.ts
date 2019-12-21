import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanTaskListComponent } from './kanban-task-list.component';

describe('KanbanTaskListComponent', () => {
  let component: KanbanTaskListComponent;
  let fixture: ComponentFixture<KanbanTaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KanbanTaskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
