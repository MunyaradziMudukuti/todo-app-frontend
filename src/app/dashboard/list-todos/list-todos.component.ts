import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {ToastrService} from "ngx-toastr";
import {Todo} from "../../shared/models/todo/todo";
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos!: Todo[];
  @Input() reloadTodos: boolean = false;

  // MatPaginator Inputs
  pageNumber: number = 0;
  length: number = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10];

  // MatPaginator Output
  pageEvent!: PageEvent;
  currentPage: number = 0;

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private todoService: TodoService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.searchTodo();
  }

  onPageChange(pageEvent: PageEvent){
    this.pageNumber = this.paginator.pageIndex;
    this.pageSize = this.paginator.pageSize;
    this.searchTodo();
  }

  searchTodo() {
    this.todoService.searchTodos("", this.pageNumber, this.pageSize)
      .subscribe(
        {
          next: res => {
            this.todos = res.content;
            console.log("########### Content: ",this.todos);
            this.paginator.length = res.totalElements;
          },
          error: err => {

            let message: string;

            if (err.error === null) {
              message = err.message
            } else {
              message = err.error.message
            }

            this.toastrService.error(message);
          }
        }
      )
  }

  editTask(todo: Todo) {

  }

  deleteTask(todo: Todo) {

  }
}
