import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TodoCategory} from "../../shared/models/todo/todo.category";
import {Todo} from "../../shared/models/todo/todo";
import {TodoCategoryService} from "../../services/todo-category.service";
import {TodoService} from "../../services/todo.service";
import {TodoRequest} from "../../shared/models/todo/todo.request";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html',
  styleUrls: ['./add-todo-dialog.component.css']
})
export class AddTodoDialogComponent implements OnInit {

  selectedDateTime!: Date;
  todoCategories!: TodoCategory [];
  taskForm!: FormGroup;
  todo!: Todo;

  constructor(private fb: FormBuilder, private todoCategoryService: TodoCategoryService, private todoService: TodoService, private toastrService: ToastrService) {
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

  addTodo() {
    const todoRequest: TodoRequest = this.taskForm.getRawValue();
    this.todoService.addTodo(todoRequest)
      .subscribe(
        {
          next: value => {
            this.todo = value;
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
        title: [null, Validators.required],
        description: [null],
        todoCategoryId: [null, Validators.required],
        dueDateTime: [null]
      }
    )
  }

  saveDateTime(): void {
    console.log(this.selectedDateTime);
  }

}
