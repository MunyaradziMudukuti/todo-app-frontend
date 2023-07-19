import {Injectable} from '@angular/core';
import {apiUrl} from "../shared/models/contants/constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Todo} from "../shared/models/todo/todo";
import {TodoRequest} from "../shared/models/todo/todo.request";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private baseUrl: string = apiUrl + '/v1/todos';

  constructor(private httpClient: HttpClient) {
  }

  addTodo(todoRequest: TodoRequest): Observable<Array<Todo>> {
    return this.httpClient.post<Array<Todo>>(this.baseUrl, todoRequest);
  }

  searchTodos(searchTerm: string, pageNumber: number, pageSize: number): Observable<any> {
    return this.httpClient.get<Todo []>(`${this.baseUrl}/search?page=${pageNumber}&size=${pageSize}&searchTerm=${searchTerm}`);
  }

}
