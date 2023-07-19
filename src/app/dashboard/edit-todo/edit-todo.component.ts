import {Component, Inject} from '@angular/core';
import {Todo} from "../../shared/models/todo/todo";
import {TodoCategory} from "../../shared/models/todo/todo.category";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TodoCategoryService} from "../../services/todo-category.service";
import {TodoService} from "../../services/todo.service";
import {ToastrService} from "ngx-toastr";
import {TodoRequest} from "../../shared/models/todo/todo.request";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent {

  selectedDateTime!: Date;
  todoCategories!: TodoCategory [];
  taskForm!: FormGroup
  todo!: Todo;
  editedTodo!: Todo;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private fb: FormBuilder, private todoCategoryService: TodoCategoryService, private todoService: TodoService, private toastrService: ToastrService) {
    this.todo = this.data.todo;
    console.log("############## todo: ", this.todo);
  }

  ngOnInit(): void {
    this.createForm();
    this.todoCategoryService.getMyCategories().subscribe(
      {
        next: value => {
          this.todoCategories = value;
        }
      }
    );
  }

  editTodo()  {
    const todoRequest: TodoRequest = this.taskForm.getRawValue();
     this.todoService.editTodo(this.todo.id, todoRequest)
      .subscribe(
        {
          next: value => {
            this.editedTodo = value;
          },
          error: err => {
            this.toastrService.error(err.error.message);
          }
        }
      )
  }

  createForm() {
    this.taskForm = this.fb.group(
      {
        title: [this.todo.title, Validators.required],
        description: [this.todo.description, Validators.required],
        todoCategoryId: [this.todo.todoCategory.id, Validators.required],
        dueDateTime: [null]
      }
    )
  }
}
