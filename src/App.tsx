import React, { useEffect, useState } from 'react';
import './App.css';

import { AddTodoItem } from './components/AddTodoItem';

import type { ITodo } from './interfaces';

const ESCAPE_KEY = 'Escape';
const NAMESPACE = 'todoApp';

function App() {
  const [allTodos, setAllTodos] = useState<Array<ITodo>>([]);
  const [activeTodos, setActiveTodos] = useState<Array<ITodo>>([]);
  const [completedTodos, setCompletedTodos] = useState<Array<ITodo>>([]);

  useEffect(() => {
    const store = localStorage.getItem(NAMESPACE);
    setAllTodos(store ? JSON.parse(store) : []);

    const active: ITodo[] = [];
    const completed: ITodo[] = [];
    for (const todo of allTodos) {
      if (todo.completed) {
        completed.push(todo);
      } else {
        active.push(todo);
      }
    }
    setActiveTodos(active);
    setCompletedTodos(completed);
  }, [allTodos]); 

  const addTodo = (newTodo: string): void => {
    setAllTodos(prev => [...prev, {
      timestamp: Date.now(),
      text: newTodo,
      completed: false
    }]);
    localStorage.setItem(NAMESPACE, JSON.stringify(allTodos));
  }

  return (
    <div className="App">
      <AddTodoItem {...{addTodo}} />
    </div>
  );
}

export default App;