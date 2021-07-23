
function MarkAllComplete({ markAllComplete }: IMarkAllCompleteProps) {
  return (
    <div className='MarkAllComplete'>
      <input
        type='checkbox'
        className='MarkAllComplete-checkbox'
        id='mark-complete-checkbox'
        onClick={() => markAllComplete()}
      />
      <label htmlFor='mark-complete-checkbox'>
        Mark all as complete
      </label>
    </div>
  );
}

interface IMarkAllCompleteProps {
  markAllComplete: () => void;
}

export { MarkAllComplete }