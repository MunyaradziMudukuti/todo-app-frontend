import {Component} from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {Todo} from "../../shared/models/todo/todo";

@Component({
  selector: 'app-view-todo',
  templateUrl: './view-todo.component.html',
  styleUrls: ['./view-todo.component.css']
})
export class ViewTodoComponent {

  todo!: Todo;

  constructor(private todoService: TodoService) {

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
}
