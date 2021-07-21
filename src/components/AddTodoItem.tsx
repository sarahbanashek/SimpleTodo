import { useState } from 'react';

const ENTER_KEY = 'Enter';

function AddTodoItem({ addTodo }: IAddTodoItemProps) {
  const [newTodo, setNewTodo] = useState<string>('');

  const handleEnterKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== ENTER_KEY || newTodo === '') {
      return;
    }
    
    event.preventDefault();
    
    addTodo(newTodo);
    setNewTodo('');
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
    </div>
  );
}

interface IAddTodoItemProps {
  addTodo: (val: string) => void;
}

export { AddTodoItem };