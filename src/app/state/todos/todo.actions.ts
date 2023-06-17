import { createAction, props } from "@ngrx/store";
import { Todo } from "../../interface/user.interface";

export const initTodoList = createAction('[Tosolist] Initialize Todolist'); 

export const addTodo = createAction(
  '[Todolist] Add a Todo',
  props<Todo>(),
)
export const addTodoSuccess = createAction(
  '[Todolist] Add a Todo Success',
)
export const addTodoFailed = createAction(
  '[Todolist] Add a Todo Failed',
  props<{ err : string}>()
)
export const deleteTodo = createAction(
    '[Todolist] Delect a Todo',
    props<{ id: number }>()  //inside the props: the payload, in this case the payload is id number
  ); 
  export const deleteTodoSuccess = createAction(
    '[Todolist] Delect a Todo Success',
    props<{ id: number }>()
  );
  export const deleteTodoFailed = createAction(
    '[Todolist] Delect a Todo Failed',
    props<{ err: string }>()
  );

export const loadTodolist = createAction('[Todolist] Load Todolist');

export const loadTodosSuccess = createAction(
    '[Todolist] Load Todolist Success',
    props<{ todos: Todo[] }>()
  );

  export const loadTodosFailed = createAction(
    '[Todolist] Load Todolist Failed',
    props<{ err: string }>()
  );
