import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTodoDialogComponent } from './delete-todo-dialog.component';

describe('DeleteTodoDialogComponent', () => {
  let component: DeleteTodoDialogComponent;
  let fixture: ComponentFixture<DeleteTodoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteTodoDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteTodoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
