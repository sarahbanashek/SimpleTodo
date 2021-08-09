export function OptionsDisplay({
  areTodosActive,
  todoCount,
  todosExist,
  showTodos,
  setShowTodos,
  modifyAll
}: {
  areTodosActive: boolean,
  todoCount: number,
  todosExist: boolean,
  showTodos: boolean,
  setShowTodos: React.Dispatch<React.SetStateAction<boolean>>,
  modifyAll:  () => void
}) {
  return (
    <div className='options-display'>
      <button
        type='button'
        className='options-display__button'
        onClick={() => setShowTodos(!showTodos)}
        disabled={!todosExist}
      >
        {showTodos
          ? <span className='material-icons'>expand_more</span>
          : <span className='material-icons'>expand_less</span>
        }
        <span className='options-display__completed-count'>
          {todoCount} {areTodosActive ? 'active' : 'completed'}
        </span>
      </button>
      
      <button
        type='button'
        className={`options-display__button options-display__button__${areTodosActive ? 'active' : 'completed'}`}
        onClick={modifyAll}
        disabled={!todosExist}
      >
        <span>{areTodosActive ? 'Mark all as complete' : 'Delete all'}</span>
        {areTodosActive
          ? <span className='material-icons options-display__button__icon'>done</span>
          : <span className='material-icons options-display__button__icon'>delete_forever</span>
        }
      </button>
    </div>
  );
}