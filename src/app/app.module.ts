import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from "@angular/forms";
import {UserService} from "./services/user.service";
import {ToastrModule} from 'ngx-toastr';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ToastrService} from 'ngx-toastr';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatListModule} from "@angular/material/list";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCardModule} from "@angular/material/card";
import { CategoryDialogComponent } from './dashboard/category-dialog/category-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { UserManagementComponent } from './dashboard/user-management/user-management.component';
import {MatLineModule} from "@angular/material/core";
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ListTodosComponent } from './dashboard/list-todos/list-todos.component';
import {AddTodoDialogComponent} from "./dashboard/add-todo-dialog/add-todo-dialog.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {JwtInterceptor} from "./services/jwt.interceptor";
import {MatSelectModule} from "@angular/material/select";
import { EditTodoDialogComponent } from './dashboard/edit-todo-dialog/edit-todo-dialog.component';
import { DeleteTodoDialogComponent } from './dashboard/delete-todo-dialog/delete-todo-dialog.component';
import { SideNavComponent } from './dashboard/side-nav/side-nav.component';
import {MatSidenavModule} from "@angular/material/sidenav";


@NgModule({
    declarations: [
        AppComponent,
        SignUpComponent,
        LoginComponent,
        DashboardComponent,
        CategoryDialogComponent,
        AddTodoDialogComponent,
        NavbarComponent,
        UserManagementComponent,
        ListTodosComponent,
        EditTodoDialogComponent,
        DeleteTodoDialogComponent,
        SideNavComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule,
    MatLineModule,
    TimepickerModule.forRoot(),
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
  ],
    providers: [UserService, ToastrService,
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
