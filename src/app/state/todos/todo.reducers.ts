import { createReducer, on } from "@ngrx/store";
import { TodoState } from "../../interface/user.interface";
import * as TodoActions from './todo.actions';

const initialState: TodoState = {
    todolist:[],
    error: "",
}; 

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodolist, (state)=> {
    return {...state}
  }),
  on(TodoActions.loadTodosSuccess, (state, { todos }) => {
    return {
      ...state,
      todolist: todos,
    };
  }),
  on(TodoActions.loadTodosFailed, (state, { err }) => {
    return {
      ...state,
      err,
    };
  }),
  on(TodoActions.addTodo, (state, todo) => {
    // console.log("from reducer adding the todo", content);
    return {
      ...state,
      todolist:[...state.todolist, todo]
    };
  }),
  on(TodoActions.deleteTodo, (state, { id }) => {
    return {
      ...state, 
      todolist: state.todolist.filter((item) => item.id !== id),
    }
  }),
  on(TodoActions.deleteTodoSuccess, (state, { id }) => {
    return {
      ...state,
      todolist: state.todolist.filter((item) => item.id !== id),
    };
  }),
  on(TodoActions.deleteTodoFailed, (state, { err }) => {
    return {
      ...state,
      err,
    };
  })
);