import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {TodoCategoryService} from "../../services/todo-category.service";
import {TodoService} from "../../services/todo.service";
import {ToastrService} from "ngx-toastr";
import {Todo} from "../../shared/models/todo/todo";

@Component({
  selector: 'app-delete-todo-dialog',
  templateUrl: './delete-todo-dialog.component.html',
  styleUrls: ['./delete-todo-dialog.component.scss']
})
export class DeleteTodoDialogComponent {

  todo!:Todo;
  deleted!: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private fb: FormBuilder, private todoCategoryService: TodoCategoryService, private todoService: TodoService, private toastrService: ToastrService) {
    this.todo = this.data.todo;
  }


  onDelete() {
    this.todoService.deleteTodo(this.todo.id)
      .subscribe(
        {
          error: err => {
            this.toastrService.error(err.error.message);
          }
        }
      );
  }
}
