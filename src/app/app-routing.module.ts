import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ListTodosComponent} from "./dashboard/list-todos/list-todos.component";

const routes: Routes = [
  {
    path: "signup",
    component: SignUpComponent
  },
  {
    path: "list-todos",
    component: ListTodosComponent
  }
  ,
  {
    path: "**",
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
