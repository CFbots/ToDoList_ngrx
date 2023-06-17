import {createFeatureSelector, createSelector } from "@ngrx/store";
import { TodoState, Todo } from "../../interface/user.interface";

const selectTodos = createFeatureSelector<TodoState>('todos');

export const selectTodosLists = createSelector(
    selectTodos,
    (todos: TodoState): Todo[] => todos.todolist
);