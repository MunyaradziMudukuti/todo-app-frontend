import {Injectable} from '@angular/core';
import {apiUrl} from "../shared/models/contants/constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Todo} from "../shared/models/todo/todo";
import {TodoRequest} from "../shared/models/todo/todo.request";
import {UpdateTodoRequest} from "../shared/models/todo/update.todo.date.time";
import {UpdateTodoReminderSettingsRequest} from "../shared/models/todo/updateTodoReminderSettingsRequest";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private baseUrl: string = apiUrl + '/v1/todos';

  constructor(private httpClient: HttpClient) {
  }

  addTodo(todoRequest: TodoRequest): Observable<Todo> {
    return this.httpClient.post<Todo>(this.baseUrl, todoRequest);
  }

  editTodo(todoId: string, updateTodoRequest: UpdateTodoRequest): Observable<Todo> {
    return this.httpClient.put<Todo>(`${this.baseUrl}/${todoId}`, updateTodoRequest);
  }

  updateTodoReminderSettings(todoId: string, updateTodoReminderSettingsRequest: UpdateTodoReminderSettingsRequest): Observable<Todo> {
    return this.httpClient.put<Todo>(`${this.baseUrl}/${todoId}/change-reminder-settings`, updateTodoReminderSettingsRequest);
  }

  updateTodoDueDate(todoId: string, dueDate: string): Observable<Todo> {
    return this.httpClient.patch<Todo>(`${this.baseUrl}/${todoId}/change-due-date?dueDate=${dueDate}`, null);
  }

  getTodo(todoId: string): Observable<any> {
    return this.httpClient.get<Todo>(`${this.baseUrl}/${todoId}`);
  }

  searchPagedTodos(searchTerm: string, pageNumber: number, pageSize: number): Observable<any> {
    return this.httpClient.get<Todo []>(`${this.baseUrl}/search/paged?page=${pageNumber}&size=${pageSize}&searchTerm=${searchTerm}`);
  }

  searchTodos(searchTerm: string): Observable<any> {
    return this.httpClient.get<Todo []>(`${this.baseUrl}/search?searchTerm=${searchTerm}`);
  }

  deleteTodo(todoId: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${todoId}`)
  }
}
