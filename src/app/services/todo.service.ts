import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../interface/user.interface';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  url = 'https://jsonplaceholder.typicode.com/todos';

  todos: Todo[] = []; // store

  store = {
    todos: this.todos,
    products: [],
  };

  private todos$ = new BehaviorSubject(this.store.todos); // selector
  todolist$ = this.todos$.asObservable();
  
  constructor(private http: HttpClient) { }

  getTodo() {
    // action
    return this.http.get<Todo[]>(this.url).pipe(
      tap((todos) => {
        this.store.todos = [...todos];
        this.todos$.next(this.store.todos);
      })
    );
  }
}
