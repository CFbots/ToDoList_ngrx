import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TodoSelectors from '../ngrx/todo.selector';
import * as TodoActions from '../ngrx/todo.actions';
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
  todoList$: Observable<Todo[]>= this.store.select(TodoSelectors.getTodos);
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

    this.store.select(TodoSelectors.getTodos).subscribe((todos) => {
      this.todoList = todos;
    });
  }

  addTodo(){
    this.inputContent = this.form.value.inputbox;
    if(this.inputContent.trim() !== ""){
      this.store.dispatch(TodoActions.addTodo({content: this.inputContent}));
    }
  }

  deleteTodo(id: number) {
    this.store.dispatch(TodoActions.deleteTodo({ id: id }));
  }
}
