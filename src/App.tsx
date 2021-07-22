import React, { useEffect, useState } from 'react';
import './App.css';

import { AddTodoItem } from './components/AddTodoItem';
import { TodoItem } from './components/TodoItem';

import type { ITodo } from './interfaces';
import { NAMESPACE } from './constants';


function App() {
  const [allTodos, setAllTodos] = useState<Array<ITodo>>([]);
  const [activeTodos, setActiveTodos] = useState<Array<ITodo>>([]);
  const [completedTodos, setCompletedTodos] = useState<Array<ITodo>>([]);

  useEffect(() => {
    const store = localStorage.getItem(NAMESPACE);
    setAllTodos(store ? JSON.parse(store) : []);
  }, []);

  useEffect(() => {
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

  const updateStateAndStorage = (updatedTodos: ITodo[]): void => {
    setAllTodos(updatedTodos);
    localStorage.setItem(NAMESPACE, JSON.stringify(updatedTodos));
  }

  const addTodo = (newTodo: string): void => {
    const updatedTodos = [...allTodos, {
      timestamp: Date.now(),
      text: newTodo,
      completed: false
    }];
    updateStateAndStorage(updatedTodos);
  }

  const toggleTodoState = (timestamp: number): void => {
    const updatedTodos = allTodos.map(todo => {
      if (todo.timestamp !== timestamp) {
        return todo;
      } else {
        todo.completed = !todo.completed
        return todo;
      }
    });
    updateStateAndStorage(updatedTodos);
  }

  const editTodo = (timestamp: number, newText: string): void => {
    const updatedTodos = allTodos.map(todo => {
      if (todo.timestamp !== timestamp) {
        return todo;
      } else {
        todo.text = newText;
        console.dir(todo);
        return todo;
      }
    });
    updateStateAndStorage(updatedTodos);
  }

  const deleteTodo = (timestamp: number): void => {
    const remainingTodos = allTodos.filter(todo => todo.timestamp !== timestamp);
    updateStateAndStorage(remainingTodos);
  }

  return (
    <div className="App">
      <AddTodoItem {...{ addTodo }} />
      <ul className='TodoList'>
        {activeTodos.map(todo =>
          <TodoItem key={todo.timestamp} {...{
            todo,
            toggleTodoState,
            editTodo,
            deleteTodo,
          }} />)}
        {completedTodos.map(todo =>
          <TodoItem key={todo.timestamp} {...{
            todo,
            toggleTodoState,
            editTodo,
            deleteTodo
          }} />)}
      </ul>
    </div>
  );
}

export default App;