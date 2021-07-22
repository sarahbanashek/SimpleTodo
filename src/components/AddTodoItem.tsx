import { useState } from 'react';

import { ENTER_KEY } from '../constants';

function AddTodoItem({ addTodo }: IAddTodoItemProps) {
  const [newTodo, setNewTodo] = useState<string>('');

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
        placeholder='Add a task'
        onKeyDown={e => handleEnterKeyDown(e)}
        onChange={e => setNewTodo(e.target.value)}
        value={newTodo}
      />
      <button
        type='button'
        className='AddTodoItem-addButton'
        onClick={() => submitNewTodo()}
      >
      <span className='material-icons'>add</span>
      </button>
    </div>
  );
}

interface IAddTodoItemProps {
  addTodo: (val: string) => void;
}

export { AddTodoItem };