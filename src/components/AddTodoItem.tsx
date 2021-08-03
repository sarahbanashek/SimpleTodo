import { useState } from 'react';

import { ENTER_KEY } from '../constants';

export function AddTodoItem({ addTodo }: { addTodo: (val: string) => void }) {
  const [newTodo, setNewTodo] = useState('');

  const submitNewTodo = (): void => {
    addTodo(newTodo.trim());
    setNewTodo('');
  }

  const handleEnterKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === ENTER_KEY && newTodo !== '') {
      event.preventDefault();
      submitNewTodo();
    }
  }

  return (
    <div className='add-todo-item'>
      <input
        className='add-todo-item__input'
        placeholder='New task'
        onKeyDown={e => handleEnterKeyDown(e)}
        onChange={e => setNewTodo(e.target.value)}
        value={newTodo}
      />
      <button
        type='button'
        className='add-todo-item__add-button icon-button'
        onClick={submitNewTodo}
      >
      <span className='material-icons'>add</span>
      </button>
    </div>
  );
}