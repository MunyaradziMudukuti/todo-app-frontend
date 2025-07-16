import {Component, Inject} from '@angular/core';
import {Todo} from "../../shared/models/todo/todo";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {TodoCategoryService} from "../../services/todo-category.service";
import {TodoService} from "../../services/todo.service";
import {ToastrService} from "ngx-toastr";
import {ReminderFrequency} from "../../shared/models/todo/reminder.frequency";

@Component({
  selector: 'app-change-date-dialog-component',
  templateUrl: './change-date-dialog-component.html',
  styleUrls: ['./change-date-dialog-component.css']
})
export class ChangeDateDialogComponent {
  todo!:Todo;
  isDialogOpen: boolean = false;
  selectedDate!: Date;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private fb: FormBuilder, private todoCategoryService: TodoCategoryService, private todoService: TodoService, private toastrService: ToastrService) {
    this.todo = this.data.todo;
    this.isDialogOpen = true;
  }

  changeDueDate(){
    const selectedDate  = `${this.selectedDate.getDate()}/${this.selectedDate.getMonth()}/${this.selectedDate.getFullYear()}`;
    console.log("############# selectedDate: ", this.selectedDate)
    this.todoService.updateTodoDueDate(this.todo.id, selectedDate)
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

}
