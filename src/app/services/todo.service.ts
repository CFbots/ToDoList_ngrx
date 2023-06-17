import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../interface/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  url: string = 'https://jsonplaceholder.typicode.com/todos';
  
  constructor(private http: HttpClient) { }

  getTodo(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.url);
  }

  deleteTodo(id: number): Observable<void>{
    return this.http.delete<void>(this.url + '/' + id);
  }

  addTodo(todo: Todo): Observable<Todo>{
    return this.http.post<Todo>(this.url, todo);
  }
}
