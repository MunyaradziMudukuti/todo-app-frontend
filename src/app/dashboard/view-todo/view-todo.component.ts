import {Component} from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {Todo} from "../../shared/models/todo/todo";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-view-todo',
  templateUrl: './view-todo.component.html',
  styleUrls: ['./view-todo.component.css']
})
export class ViewTodoComponent {

  todo!: Todo;
  todoForm!: FormGroup;

  constructor(private fb: FormBuilder, private todoService: TodoService) {

  }

  viewTodo(todoId: string) {
    this.todoService.getTodo(todoId)
      .subscribe(
        {
          next: todo => {
            this.todo = todo;
          }
        }
      )
  }

  createForm() {
    this.todoForm = this.fb.group(
      {
        title: [this.todo.title, Validators.required],
        description: [this.todo.description, Validators.required],

      }
    )
  }

}
