import React from 'react';

function Footer({ numActive, numCompleted, showActiveTodos, setShowActiveTodos, showCompletedTodos, setShowCompletedTodos, markAllComplete, deleteAllCompleted }: IFooterProps) {
  return (
    <div className='Footer'>
      {numActive > 0
        ? (
          < div className='Footer-toggleShowActive'>
            <input
              className='Footer-toggleShowActive-checkbox'
              type='checkbox'
              id='showActive-checkbox'
              checked={showActiveTodos}
              onChange={() => setShowActiveTodos(!showActiveTodos)}
            />
            <label htmlFor='showActive-checkbox'>
              Show all active todos
            </label>
          </div>)
        : null}

      {numCompleted > 0
        ? (
          <div className='Footer-toggleShowCompleted'>
            <input
              className='Footer-toggleShowCompleted-checkbox'
              type='checkbox'
              id='showCompleted-checkbox'
              checked={showCompletedTodos}
              onChange={() => setShowCompletedTodos(!showCompletedTodos)}
            />
            <label htmlFor='showCompleted-checkbox'>
              Show all completed todos
            </label>
          </div>)
        : null}

      <p className='Footer-activeCount'>
        {numActive} active {numActive === 1 ? 'todo' : 'todos'}
      </p>

      <p className='Footer-completedCount'>
        {numCompleted} completed {numCompleted === 1 ? 'todo' : 'todos'}
      </p>

      {showActiveTodos && numActive > 0
        ? (
          <button
            type='button'
            className='Footer-markAllCompleteButton complete-or-delete'
            onClick={() => markAllComplete()}
          >
            <span className='Footer-markAllCompleteButton-text'>Mark all as complete</span>
            <span className='Footer-markAllCompleteButton-icon material-icons'>done</span>
          </button>
        ) : null}

      {showCompletedTodos && numCompleted > 0
        ? (
            <button
              type='button'
              className='Footer-deleteAllCompletedButton complete-or-delete'
              onClick={() => deleteAllCompleted()}
          >
            <span className='Footer-deleteAllCompletedButton-text'>delete all completed todos</span>
            <span className='Footer-deleteAllCompletedButton-icon material-icons'>delete_forever</span>
            </button>
        ) : null}
    </div>
  );
}

interface IFooterProps {
  numActive: number,
  numCompleted: number,
  showActiveTodos: boolean,
  setShowActiveTodos: React.Dispatch<React.SetStateAction<boolean>>,
  showCompletedTodos: boolean,
  setShowCompletedTodos: React.Dispatch<React.SetStateAction<boolean>>,
  markAllComplete: () => void,
  deleteAllCompleted: () => void
}

export { Footer }