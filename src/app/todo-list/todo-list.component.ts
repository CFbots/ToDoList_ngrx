import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TodoSelectors from '../state/todos/todo.selector';
import * as TodoActions from '../state/todos/todo.actions';
import { Todo } from '../interface/user.interface';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit{
  todoList: Todo[] = [];
  todoList$: Observable<Todo[]>= this.store.select(TodoSelectors.selectTodosLists);
  form!: FormGroup;
  private inputContent: string = "";


  get inputbox(): FormControl {
    return this.form.get('inputbox') as FormControl;
  }


  constructor(
    private store: Store,
    private fb: FormBuilder
    ){}

  ngOnInit(): void {
    this.form = this.fb.group({
      inputbox: [],
    });
    
    this.store.dispatch(TodoActions.loadTodolist());
    this.store.select(TodoSelectors.selectTodosLists).subscribe((todoList)=>{
      this.todoList = todoList;
    })
  }

  addTodo(){
    this.inputContent = this.form.value.inputbox;
    this.form.reset();
    if(this.inputContent.trim() !== ""){
      const newTodo: Todo = {userId: 1, id: this.todoList.length + 1, title: this.inputContent, completed: false};
      this.store.dispatch(TodoActions.addTodo(newTodo));
    }
  }

  deleteTodo(id: number) {
    this.store.dispatch(TodoActions.deleteTodo({ id: id }));
  }
}
