import {Injectable} from '@angular/core';
import {apiUrl} from "../shared/models/contants/constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TodoCategory} from "../shared/models/todo/todo.category";

@Injectable({
  providedIn: 'root'
})
export class TodoCategoryService {

  private baseUrl: string = apiUrl + '/v1/todo-categories'
  constructor(private httpClient: HttpClient) { }

  getMyCategories():Observable<Array<TodoCategory>>{
    return this.httpClient.get<Array<TodoCategory>>(this.baseUrl)
  }

}
