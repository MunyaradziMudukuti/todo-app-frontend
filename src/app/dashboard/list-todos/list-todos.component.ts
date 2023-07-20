import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {ToastrService} from "ngx-toastr";
import {Todo} from "../../shared/models/todo/todo";
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatDialog} from "@angular/material/dialog";
import {EditTodoDialogComponent} from "../edit-todo-dialog/edit-todo-dialog.component";
import {DeleteTodoDialogComponent} from "../delete-todo-dialog/delete-todo-dialog.component";

@Component({
    selector: 'app-list-todos',
    templateUrl: './list-todos.component.html',
    styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

    todos!: Todo[];
    searchTerm: string = " ";

    // MatPaginator Inputs
    pageNumber: number = 0;
    length: number = 0;
    pageSize = 10;
    pageSizeOptions: number[] = [5, 10];

    // MatPaginator Output
    pageEvent!: PageEvent;
    currentPage: number = 0;

    @ViewChild('paginator') paginator!: MatPaginator;

    constructor(private dialog: MatDialog, private todoService: TodoService, private toastrService: ToastrService) {
    }

    ngOnInit(): void {
        this.loadTodo();
    }

    onPageChange(pageEvent: PageEvent) {
        this.pageNumber = this.paginator.pageIndex;
        this.pageSize = this.paginator.pageSize;
        this.loadTodo();
    }

    searchTodo(searchTerm: string){
        this.searchTerm=searchTerm;
        this.loadTodo();
    }

    private loadTodo() {
        console.log("############### List Search Term: ",this.searchTerm);
        this.todoService.searchTodos(this.searchTerm, this.pageNumber, this.pageSize)
            .subscribe(
                {
                    next: res => {
                        this.todos = res.content;
                        console.log("########### Content: ", this.todos);
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

    editTodo(todo: Todo) {
        const dialogRef = this.dialog.open(EditTodoDialogComponent, {
            width: '300px',
            data: {todo: todo}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadTodo()
            }
        });
    }

    deleteTask(todo: Todo) {

        const dialogRef = this.dialog.open(DeleteTodoDialogComponent, {
            width: '300px',
            data: {todo: todo}
        });

        dialogRef.afterClosed().subscribe(result => {
                this.loadTodo()
        });
    }
}
