import React, { useRef, useState } from 'react';

import type { ITodo } from '../interfaces';
import { ENTER_KEY, ESCAPE_KEY } from '../constants';

function TodoItem({ todo, toggleTodoState, editTodo, deleteTodo }: ITodoItemProps) {
  const [todoText, setTodoText] = useState<string>(todo.text);
  const [editingText, setEditingText] = useState<boolean>(false);

  const textInput = useRef<HTMLInputElement>(null);

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

  const handleEditButtonClick = (): void => {
    setEditingText(true);
    window.setTimeout(() => {
      if (textInput.current !== null) {
        console.log(textInput.current);
        textInput.current.focus();
      }
    }, 0);
  }
  
  return (
    <li className={classNames}>
      <div className='TodoItem-view'>
        <input
          className='TodoItem-view-toggle'
          type='checkbox'
          aria-label='Mark todo item as completed'
          checked={todo.completed}
          onChange={() => toggleTodoState(todo.timestamp)}
        />
        <label
          className='TodoItem-view-text'
          hidden={editingText}
        >
          {todoText}
        </label>
        <input
          className='TodoItem-view-text-editInput'
          type={editingText ? 'input' : 'hidden'}
          aria-label='Edit todo text'
          value={todoText}
          ref={textInput}
          onChange={e => setTodoText(e.target.value)}
          onKeyDown={e => handleKeyDown(e)}
          onBlur={() => handleBlur()}
        />
        <button
          className='TodoItem-view-editButton'
          aria-label='Edit this todo item'
          onClick={() => handleEditButtonClick()}
        >
          <span className='material-icons'>edit</span>
        </button>
        <button
          className='TodoItem-view-delete'
          aria-label='Permanently delete this todo item'
          onClick={() => deleteTodo(todo.timestamp)}
        >
          <span className='material-icons'>delete_forever</span>
        </button>
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