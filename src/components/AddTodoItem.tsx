import { useState } from 'react';

import { ENTER_KEY } from '../constants';

export function AddTodoItem({ addTodo }: { addTodo: (val: string) => void }) {
  const [newTodo, setNewTodo] = useState('');

  const submitNewTodo = (): void => {
    addTodo(newTodo.trim());
    setNewTodo('');
  }

  const handleEnterKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== ENTER_KEY || newTodo === '') {
      return;
    }
    event.preventDefault();
    submitNewTodo();
  }

  return (
    <div className='AddTodoItem'>
      <input
        className='AddTodoItem-input'
        placeholder='New task'
        onKeyDown={e => handleEnterKeyDown(e)}
        onChange={e => setNewTodo(e.target.value)}
        value={newTodo}
      />
      <button
        type='button'
        className='AddTodoItem-addButton icon-button'
        onClick={() => submitNewTodo()}
      >
      <span className='material-icons'>add</span>
      </button>
    </div>
  );
}