import React from 'react';

export function Footer({
  numActive,
  numCompleted,
  showActiveTodos,
  setShowActiveTodos,
  showCompletedTodos,
  setShowCompletedTodos,
  markAllComplete,
  deleteAllCompleted
}: {
  numActive: number,
  numCompleted: number,
  showActiveTodos: boolean,
  setShowActiveTodos: React.Dispatch<React.SetStateAction<boolean>>,
  showCompletedTodos: boolean,
  setShowCompletedTodos: React.Dispatch<React.SetStateAction<boolean>>,
  markAllComplete: () => void,
  deleteAllCompleted: () => void
}) {
  return (
    <div className='footer'>
      <div className='footer__todo-counts footer__row-container'>
        <span>
          {numActive} active
        </span>

        <span>
          {numCompleted} completed
        </span>
      </div>

      <div className='footer__toggle-show footer__row-container'>
        {numActive > 0
          ? (
            <div className='footer__toggle-show--active'>
              <input
                type='checkbox'
                id='show-active-checkbox'
                checked={showActiveTodos}
                onChange={() => setShowActiveTodos(!showActiveTodos)}
              />
              <label htmlFor='show-active-checkbox'>
                Show all active
              </label>
            </div>)
          : null}

        {numCompleted > 0
          ? (
            <div className='footer__toggle-show--completed'>
              <input
                type='checkbox'
                id='show-completed-checkbox'
                checked={showCompletedTodos}
                onChange={() => setShowCompletedTodos(!showCompletedTodos)}
              />
              <label htmlFor='show-completed-checkbox'>
                Show all completed
              </label>
            </div>)
          : null}
      </div>

      <div className='footer__buttons-container footer__row-container'>
        {showActiveTodos && numActive > 0
          ? (
            <button
              type='button'
              className='footer__buttons-container__button'
              onClick={markAllComplete}
            >
              <span>Mark all as complete</span>
              <span className='footer__buttons-container__button-icon material-icons'>done</span>
            </button>
          ) : null}

        {showCompletedTodos && numCompleted > 0
          ? (
            <button
              type='button'
              className='footer__buttons-container__button'
              onClick={deleteAllCompleted}
            >
              <span className='Footer-deleteAllCompleted-text'>Delete all completed</span>
              <span className='Footer-button-icon material-icons'>delete_forever</span>
            </button>
          ) : null}
      </div>
    </div>
  );
}