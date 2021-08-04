import React, { useEffect, useRef, useState } from 'react';

import type { Todo } from '../interfaces';
import { ENTER_KEY, ESCAPE_KEY } from '../constants';

export function TodoItem({ todo, toggleTodoState, editTodo, deleteTodo }: {
  todo: Todo;
  toggleTodoState: (createdAt: number) => void;
  editTodo: (createdAt: number, newText: string) => void;
  deleteTodo: (createdAt: number) => void;
}) {
  const [todoText, setTodoText] = useState(todo.text);
  const [editingText, setEditingText] = useState(false);

  const textInput = useRef<HTMLInputElement>(null);
  
  const submitUpdatedTodo = (): void => {
    if (todoText.trim() !== todo.text) {
      editTodo(todo.createdAt, todoText.trim());
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === ENTER_KEY) {
      event.preventDefault();

      submitUpdatedTodo();
      setEditingText(false);
    } else if (event.key === ESCAPE_KEY) {
      setTodoText(todo.text);
      setEditingText(false);
    }
  }

  const handleBlur = (): void => {
    submitUpdatedTodo();
    setEditingText(false);
  }

  const handleEditButtonClick = (): void => {
    setEditingText(true);
  }

  useEffect(() => {
    if (textInput.current !== null) {
      textInput.current.focus();
    }
  }, [editingText]);

  return (
    <div className={`todo-item todo-item__${todo.completed ? 'completed' : 'active'}`}>
      <div className='todo-item__checkbox-text-date'>
        <input
          id={`mark-completed-checkbox-${todo.createdAt}`}
          type='checkbox'
          aria-label='Mark todo item as completed'
          checked={todo.completed}
          onChange={() => toggleTodoState(todo.createdAt)}
        />

        <div className='todo-item__text-and-date'>
        {editingText
          ? (
            <input
              type='input'
              aria-label='Edit todo text'
              value={todoText}
              ref={textInput}
              onChange={e => setTodoText(e.target.value)}
              onKeyDown={e => handleKeyDown(e)}
              onBlur={handleBlur}
            />)
          : (
            <label
                htmlFor={`mark-completed-checkbox-${todo.createdAt}`}
                className={`todo-item__text todo-item__text__${todo.completed ? 'completed' : 'active'}`}
            >
              {todoText}
            </label>
          )}
          
          <div className='todo-item__dates'>
            <span className='todo-item__date-added'>added {(new Date(todo.createdAt)).toLocaleString()}</span>
            {todo.completedAt
              ? <span className='todo-item__date-completed'>completed {(new Date(todo.completedAt)).toLocaleString()}</span>
              : null
            }
          </div>
        </div>
      </div>

      <div className='todo-item__buttons'>
        <button
          className='icon-button'
          aria-label='Edit this todo item'
          onClick={handleEditButtonClick}
        >
          <span className='material-icons'>edit</span>
        </button>
        <button
          className='icon-button'
          aria-label='Permanently delete this todo item'
          onClick={() => deleteTodo(todo.createdAt)}
        >
          <span className='material-icons'>delete_forever</span>
        </button>
      </div>
    </div>
  );
}