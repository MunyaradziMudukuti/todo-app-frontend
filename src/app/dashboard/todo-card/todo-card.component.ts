import {Component, ElementRef, OnInit, signal, ViewChild} from '@angular/core';
import {Todo} from "../../shared/models/todo/todo";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TodoService} from "../../services/todo.service";
import {ToastrService} from "ngx-toastr";
import {DeleteTodoDialogComponent} from "../delete-todo-dialog/delete-todo-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {
  ChangeDateTimeDialogComponent
} from "../change-date-time-dialog-component/change-date-time-dialog.component";
import {getShortenedName, Month} from "../../shared/models/date/month";
import {ChangeDateDialogComponent} from "../change-date-dialog-component/change-date-dialog-component";
import {ReminderFrequency} from "../../shared/models/todo/reminder.frequency";
import {UpdateTodoReminderSettingsRequest} from "../../shared/models/todo/updateTodoReminderSettingsRequest";

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css']
})
export class TodoCardComponent implements OnInit {

  searchTerm: string = " ";
  @ViewChild('dueDateButton') buttonRef!: ElementRef;

  reminderFrequency!: ReminderFrequency;

  images = [
    "nature",
    "sky",
    "grass",
    "mountains",
    "rivers",
    "glacier",
    "forest",
    "streams",
    "rain",
    "clouds",
  ];

  colors: string[] = ['#C9DF56', '#E0F1CA', '#9EA9FF', '#FFD027'];

  todos!: Todo[];
  cards = signal<Todo[]>([]);
  // const imageUrl = `https://source.unsplash.com/random/500X500?${this.images[i]}`;
  selectedDueDate!: Date;

  constructor(private dialog: MatDialog, private fb: FormBuilder, private todoService: TodoService, private toastrService: ToastrService) {

  }

  ngOnInit(): void {
    this.loadTodo()
  }

  randomizeBackgroundColor() {
    // Randomly select one of the defined colors
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }

  private loadTodo() {
    console.log("############### List Search Term: ", this.searchTerm);
    this.todoService.searchTodos(this.searchTerm)
      .subscribe(
        {
          next: res => {
            this.todos = res;
            console.log("########### Content: ", this.todos);
          },
          error: err => {

            let message: string;

            if (err.error === null) {
              message = err.message
            } else {
              message = err.error.message
            }

            this.toastrService.error(message);
          },
          complete: () => {
            // this.viewTodoComponent.viewTodo(this.todos[0].id)
            this.todos.forEach((todo, index) => {
              todo.imageUrl = `https://picsum.photos/200/300`;
            })
          }
        }
      )
  }

  deleteTask(todo: Todo) {

    const dialogRef = this.dialog.open(DeleteTodoDialogComponent, {
      data: {todo: todo}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadTodo()
    });
  }

  formatDate(dateString: string): string {
    console.log("############# inputDate: ", dateString)
    if (dateString) {
      const dateTime = new Date(dateString);
      return `${dateTime.getDate()} ${getShortenedName(dateTime)} ${dateTime.getFullYear()}`;
    }
    return '';
  }

  changeDateTime(todo: Todo) {
    // const dialogRef = this.dialog.open(ChangeDateTimeDialogComponent, {
    //   data: {todo: todo},
    //   panelClass: 'custom-dialog'
    // });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   this.loadTodo()
    // });
  }


  changeDate(todo: Todo) {
    const selectedDate = `${String(this.selectedDueDate.getDate()).padStart(2, '0')}/${String(this.selectedDueDate.getMonth() + 1).padStart(2, '0')}/${this.selectedDueDate.getFullYear()}`;
    console.log("############# selectedDate: ", this.selectedDueDate)
    this.todoService.updateTodoDueDate(todo.id, selectedDate)
      .subscribe(
        {
          next: value => {
            todo = value;
          },
          error: err => {
            this.toastrService.error(err.error.message);
          }
        }
      )
  }

  protected readonly ReminderFrequency = ReminderFrequency;
  reminderDateTime!: Date;

  changeFrequency(todo: Todo, frequency: ReminderFrequency) {
    let updateTodoReminderSettingsRequest!: UpdateTodoReminderSettingsRequest;
    updateTodoReminderSettingsRequest.reminderFrequency = frequency;
    updateTodoReminderSettingsRequest.reminderFrequency ? todo.dueDate : Date.now();
    this.todoService.updateTodoReminderSettings(todo.id, updateTodoReminderSettingsRequest);
  }
}
