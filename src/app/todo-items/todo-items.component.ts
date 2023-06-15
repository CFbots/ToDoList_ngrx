import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../interface/user.interface';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent {
  @Input('item') todo!: Todo;
  @Output() emitId = new EventEmitter();

  deleteTodo() {
    this.emitId.emit(this.todo.id);
  }
}
