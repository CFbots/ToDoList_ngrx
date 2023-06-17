import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TodoActions from './todo.actions';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../../interface/user.interface';
import { TodoService } from 'src/app/services/todo.service';


@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private http: HttpClient, private todoService: TodoService) {}
  url = 'https://jsonplaceholder.typicode.com/todos';

  loadTodos$ = createEffect(() =>
  this.actions$.pipe(
    ofType(TodoActions.loadTodolist),
    exhaustMap(() =>
      this.todoService.getTodo().pipe(
        map((todos) => TodoActions.loadTodosSuccess({ todos })),
        catchError((err) => of(TodoActions.loadTodosFailed({ err })))
      )
    )
  )
);
  deleteTodo$ = createEffect(() => 
    this.actions$.pipe(
      ofType(TodoActions.deleteTodo), //listening to this action: deleteTodo
      exhaustMap((action) => 
        this.todoService.deleteTodo(action.id).pipe(
          map(() => TodoActions.deleteTodoSuccess({ id: action.id })),
          catchError((err) => of(TodoActions.deleteTodoFailed({ err })))
        )
      )
    )
  );
  addTodo$ = createEffect(() => 
    this.actions$.pipe(
      ofType(TodoActions.addTodo), 
      exhaustMap((Todo) => 
        this.todoService.addTodo(Todo).pipe(
          map(() => TodoActions.addTodoSuccess()),
          catchError((err) => of(TodoActions.addTodoFailed(err)))
        )
      )
    )
  );
}