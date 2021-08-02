import React, { useRef, useState } from 'react';

import type { Todo } from '../interfaces';

export function TodoItem({ todo, toggleTodoState, editTodo, deleteTodo }: {
  todo: Todo;
  toggleTodoState: (timestamp: number) => void;
  editTodo: (timestamp: number, newText: string) => void;
  deleteTodo: (timestamp: number) => void;
}) {
  const [todoText, setTodoText] = useState(todo.text);
  const [editingText, setEditingText] = useState(false);

  const textInput = useRef<HTMLInputElement>(null);

  const classNames = todo.completed
    ? 'TodoItem TodoItem--completed'
    : 'TodoItem TodoItem--active';
  
  const submitUpdatedTodo = (): void => {
    if (todoText.trim() !== todo.text) {
      editTodo(todo.timestamp, todoText.trim());
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key !== ESCAPE_KEY && event.key !== ENTER_KEY) {
      return;
    } else if (event.key === ENTER_KEY) {
      event.preventDefault();

      submitUpdatedTodo();
      setEditingText(false);
      setTodoText(todo.text);
    }
  }

  const handleBlur = (): void => {
    submitUpdatedTodo();
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
    <div className={classNames}>
      <div className='TodoItem-checkboxAndText'>
        <input
          className='TodoItem-checkboxAndText-toggleCompleted'
          id={`mark-completed-checkbox-${todo.timestamp}`}
          type='checkbox'
          aria-label='Mark todo item as completed'
          checked={todo.completed}
          onChange={() => toggleTodoState(todo.timestamp)}
        />
        <label
          className='TodoItem-checkboxAndText-text'
          htmlFor={`mark-completed-checkbox-${todo.timestamp}`}
          hidden={editingText}
        >
          {todoText}
        </label>
        <input
          className='TodoItem-checkboxAndText-text-editInput'
          type={editingText ? 'input' : 'hidden'}
          aria-label='Edit todo text'
          value={todoText}
          ref={textInput}
          onChange={e => setTodoText(e.target.value)}
          onKeyDown={e => handleKeyDown(e)}
          onBlur={() => handleBlur()}
        />
      </div>

      <div className='TodoItem-buttons'>
        <button
          className='TodoItem-buttons-editButton icon-button'
          aria-label='Edit this todo item'
          onClick={() => handleEditButtonClick()}
        >
          <span className='material-icons'>edit</span>
        </button>
        <button
          className='TodoItem-buttons-delete icon-button'
          aria-label='Permanently delete this todo item'
          onClick={() => deleteTodo(todo.timestamp)}
        >
          <span className='material-icons'>delete_forever</span>
        </button>
      </div>
    </div>
  );
}

interface ITodoItemProps {
  todo: Todo;
  toggleTodoState: (timestamp: number) => void;
  editTodo: (timestamp: number, newText: string) => void;
  deleteTodo: (timestamp: number) => void;
}

export { TodoItem }