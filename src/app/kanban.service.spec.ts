import { TestBed } from '@angular/core/testing';

import { KanbanServiceService } from './kanban-service.service';

describe('KanbanServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KanbanServiceService = TestBed.get(KanbanServiceService);
    expect(service).toBeTruthy();
  });
});
