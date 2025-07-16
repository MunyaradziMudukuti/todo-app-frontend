import {Component, Inject} from '@angular/core';
import {Todo} from "../../shared/models/todo/todo";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {TodoCategoryService} from "../../services/todo-category.service";
import {TodoService} from "../../services/todo.service";
import {ToastrService} from "ngx-toastr";
import {ReminderFrequency} from "../../shared/models/todo/reminder.frequency";
import {MONTH} from "ngx-bootstrap/chronos/units/constants";

@Component({
  selector: 'app-change-date-time-dialog-component',
  templateUrl: './change-date-time-dialog.component.html',
  styleUrls: ['./change-date-time-dialog.component.css']
})
export class ChangeDateTimeDialogComponent {

  todo!:Todo;
  isDialogOpen: boolean = false;
  selectedDateTime!: Date;
  selectedTime!: string;
  selectedDate!: Date;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private fb: FormBuilder, private todoCategoryService: TodoCategoryService, private todoService: TodoService, private toastrService: ToastrService) {
    this.todo = this.data.todo;
    this.isDialogOpen = true;
  }

 changeReminderSettings(){
    this.combineDateTime();
    this.todoService.updateTodoReminderSettings(this.todo.id,
      {
      reminderDateTime: this.selectedDateTime,
      reminderFrequency: ReminderFrequency.DAILY
    })
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


   combineDateTime() {
      if (this.selectedDate && this.selectedTime) {
        console.log("############# selectedDate: ", this.selectedDate)
        console.log("############# selectedTime: ", this.selectedTime)
        const [hours, minutes] = this.selectedTime.split(':');
        const combinedDateTime = new Date(this.selectedDate);
        combinedDateTime.setHours(+hours);
        combinedDateTime.setMinutes(+minutes);
        this.selectedDateTime = combinedDateTime;
      }
  }
}
