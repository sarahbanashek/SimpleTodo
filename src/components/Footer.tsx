import React from 'react';

function Footer({ numActive, numCompleted, showActiveTodos, setShowActiveTodos, showCompletedTodos, setShowCompletedTodos, markAllComplete, deleteAllCompleted }: IFooterProps) {
  return (
    <div className='Footer'>
      <div className='Footer-todoCounts'>
        <span className='Footer-todoCounts-activeCount'>
          {numActive} active
        </span>

        <span className='Footer-todoCounts-completedCount'>
          {numCompleted} completed
        </span>
      </div>

      <div className='Footer-toggleShow'>
        {numActive > 0
          ? (
            <div className='Footer-toggleShow-active'>
              <input
                className='Footer-toggleShow-active-checkbox'
                type='checkbox'
                id='showActive-checkbox'
                checked={showActiveTodos}
                onChange={() => setShowActiveTodos(!showActiveTodos)}
              />
              <label htmlFor='showActive-checkbox'>
                Show all active
              </label>
            </div>)
          : null}

        {numCompleted > 0
          ? (
            <div className='Footer-toggleShow-completed'>
              <input
                className='Footer-toggleShow-completed-checkbox'
                type='checkbox'
                id='showCompleted-checkbox'
                checked={showCompletedTodos}
                onChange={() => setShowCompletedTodos(!showCompletedTodos)}
              />
              <label htmlFor='showCompleted-checkbox'>
                Show all completed
              </label>
            </div>)
          : null}
      </div>

      <div className='Footer-completeOrDeleteButtons'>
        {showActiveTodos && numActive > 0
          ? (
            <button
              type='button'
              className='Footer-completeOrDeleteButtons-markAllComplete completeOrDeleteButton'
              onClick={() => markAllComplete()}
            >
              <span className='Footer-markAllComplete-text'>Mark all as complete</span>
              <span className='Footer-button-icon material-icons'>done</span>
            </button>
          ) : null}

        {showCompletedTodos && numCompleted > 0
          ? (
              <button
                type='button'
                className='Footer-completeOrDeleteButtons-deleteAllCompleted completeOrDeleteButton'
                onClick={() => deleteAllCompleted()}
            >
              <span className='Footer-deleteAllCompleted-text'>Delete all completed</span>
              <span className='Footer-button-icon material-icons'>delete_forever</span>
              </button>
          ) : null}
      </div>
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