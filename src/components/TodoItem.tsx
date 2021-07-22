import React, { useState } from 'react';

import type { ITodo } from '../interfaces';
import { ENTER_KEY, ESCAPE_KEY } from '../constants';

function TodoItem({ todo, toggleTodoState, editTodo, deleteTodo }: ITodoItemProps) {
  const [todoText, setTodoText] = useState<string>(todo.text);
  const [editingText, setEditingText] = useState<boolean>(false);

  const classNames = todo.completed
    ? 'TodoItem TodoItem--completed'
    : 'TodoItem TodoItem--active';
  
  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key !== ESCAPE_KEY && event.key !== ENTER_KEY) {
      return;
    } else if (event.key === ENTER_KEY) {
      event.preventDefault();

      if (todoText.trim() !== todo.text) {
        editTodo(todo.timestamp, todoText.trim());
      }
    }

    setEditingText(false);
    setTodoText(todo.text);
  }

  const handleBlur = (): void => {
    if (todoText.trim() !== todo.text) {
      editTodo(todo.timestamp, todoText.trim());
    }

    setEditingText(false);
    setTodoText(todo.text);
  }
  
  return (
    <li className={classNames} key={todo.timestamp}>
      <div className='TodoItem-view'>
        <input
          className='TodoItem-view-toggle'
          type='checkbox'
          checked={todo.completed}
          onChange={() => toggleTodoState(todo.timestamp)}
        />
        <label
          className='TodoItem-view-text'
          onDoubleClick={() => setEditingText(true)}
          hidden={editingText}
        >
          {todoText}
        </label>
        <input
          className='TodoItem-view-text-input'
          type={editingText ? 'input' : 'hidden'}
          value={todoText}
          autoFocus
          onChange={e => setTodoText(e.target.value)}
          onKeyDown={e => handleKeyDown(e)}
          onBlur={() => handleBlur()}
        />
        <button
          className='TodoItem-view-delete'
          onClick={() => deleteTodo(todo.timestamp)}
        >delete</button>
      </div>
    </li>
  );
}

interface ITodoItemProps {
  todo: ITodo;
  toggleTodoState: (timestamp: number) => void;
  editTodo: (timestamp: number, newText: string) => void;
  deleteTodo: (timestamp: number) => void;
}

export { TodoItem }