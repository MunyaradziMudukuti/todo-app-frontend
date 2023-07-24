import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CategoryDialogComponent} from "./category-dialog/category-dialog.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddTodoDialogComponent} from "./add-todo-dialog/add-todo-dialog.component";
import {ListTodosComponent} from "./list-todos/list-todos.component";
import {AuthService, isAuthenticated} from "../services/auth.service";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent{
  categories: any[] = [
    {name: 'Category 1'},
    {name: 'Category 2'},
    {name: 'Category 3'}
  ];

  searchTerm: string = " ";
  @ViewChild(ListTodosComponent) listTodosComponent!: ListTodosComponent;


  constructor(private dialog: MatDialog, private fb: FormBuilder, private authService: AuthService, private toastrService: ToastrService) {
  }


  editCategory(category: any) {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '300px',
      data: {category}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Category updated:', result);
      }
    });
  }

  deleteCategory(category: any) {
    console.log('Category deleted:', category);
  }

  addTask() {
    const dialogRef = this.dialog.open(AddTodoDialogComponent, {
      width: '800px',
      height: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listTodosComponent.searchTodo("");
      }
    })
  }

  deleteTask(task: any) {
    console.log('Task deleted:', task);
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm
    this.listTodosComponent.searchTodo(searchTerm)
  }

  logout() {
    this.authService.logout();
    this.toastrService.success("Logged out successfully");
  }

   isAuthenticated() : boolean {
    return this.authService.isAuthenticated();
}

}

