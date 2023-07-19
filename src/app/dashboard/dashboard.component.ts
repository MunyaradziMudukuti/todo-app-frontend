import {Component,EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CategoryDialogComponent} from "./category-dialog/category-dialog.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddTodoDialogComponent} from "./add-todo-dialog/add-todo-dialog.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  categories: any[] = [
    { name: 'Category 1' },
    { name: 'Category 2' },
    { name: 'Category 3' }
  ];

  reloadTodos: boolean = false;

  constructor(private dialog: MatDialog,private fb: FormBuilder) {}


  ngOnInit(): void {
  }

  editCategory(category: any) {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '300px',
      data: { category }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Perform category update logic here
        console.log('Category updated:', result);
        this.reloadTodos = true;
      }
    });
  }

  deleteCategory(category: any) {
    // Perform category deletion logic here
    console.log('Category deleted:', category);
  }

   addTask() {
    const dialogRef = this.dialog.open(AddTodoDialogComponent, {
      width: '800px',
      height: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Perform task update logic here
        console.log('Task updated:', result);
      }
    })
  }

  deleteTask(task: any) {
    // Perform task deletion logic here
    console.log('Task deleted:', task);
  }
}

