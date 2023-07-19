import {TodoCategory} from "./todo.category";

export interface Todo {
  id: string,
  title: string,
  description: string,
  todoCategory: TodoCategory
}
