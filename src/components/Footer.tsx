import React from 'react';

function Footer({ numActive, numCompleted, showActiveTodos, setShowActiveTodos, showCompletedTodos, setShowCompletedTodos, deleteAllCompleted }: IFooterProps) {
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
        {numActive} active todos
      </p>

      <p className='Footer-completedCount'>
        {numCompleted} completed todos
      </p>

      {showCompletedTodos
        ? (
          <div className='Footer-deleteAllCompleted'>
            <button
              type='button'
              className='Footer-deleteAllCompleted-button'
              onClick={() => deleteAllCompleted()}
            >
              delete all completed todos
            </button>
          </div>
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
  deleteAllCompleted: () => void
}

export { Footer }