import { useEffect, useState } from 'react';
import './App.css';

import { AddTodoItem } from './components/AddTodoItem';
import { TodoItem } from './components/TodoItem';
import { Footer } from './components/Footer';

import type { Todo } from './interfaces';
import { NAMESPACE } from './constants';


function App() {
  const [allTodos, setAllTodos] = useState<Array<Todo>>([]);
  const [activeTodos, setActiveTodos] = useState<Array<Todo>>([]);
  const [completedTodos, setCompletedTodos] = useState<Array<Todo>>([]);
  const [showActiveTodos, setShowActiveTodos] = useState<boolean>(true);
  const [showCompletedTodos, setShowCompletedTodos] = useState<boolean>(true);

  useEffect(() => {
    const store = localStorage.getItem(NAMESPACE);
    setAllTodos(store ? JSON.parse(store) : []);
  }, []);

  useEffect(() => {
    setActiveTodos(allTodos.filter(t => !t.completed));
    setCompletedTodos(allTodos.filter(t => t.completed));
  }, [allTodos]);

  const updateStateAndStorage = (updatedTodos: Todo[]): void => {
    setAllTodos(updatedTodos);
    localStorage.setItem(NAMESPACE, JSON.stringify(updatedTodos));
  }

  const addTodo = (newTodo: string): void => {
    const updatedTodos = [...allTodos, {
      createdAt: Date.now(),
      text: newTodo,
      completed: false
    }];
    updateStateAndStorage(updatedTodos);
  }

  const markAllComplete = (): void => {
    const completedTimestamp = Date.now();
    updateStateAndStorage(allTodos.map(todo => {
      if (todo.completed) {
        return todo;
      } else {
        return { ...todo, completed: true, completedAt: completedTimestamp };
      }
    }));
  }

  const toggleTodoState = (createdAt: number): void => {
    const updatedTodos = allTodos.map(todo => {
      if (todo.createdAt !== createdAt) {
        return todo;
      } else {
        if (todo.completed) {
          todo.completed = false;
          todo.completedAt = undefined;
        } else {
          todo.completed = true;
          todo.completedAt = Date.now();
        }
        return todo;
      }
    });
    updateStateAndStorage(updatedTodos);
  }

  const editTodo = (createdAt: number, newText: string): void => {
    const updatedTodos = allTodos.map(todo => {
      if (todo.createdAt !== createdAt) {
        return todo;
      } else {
        todo.text = newText;
        return todo;
      }
    });
    updateStateAndStorage(updatedTodos);
  }

  const deleteTodo = (createdAt: number): void => {
    updateStateAndStorage(allTodos.filter(todo => todo.createdAt !== createdAt));
  }

  const deleteAllCompleted = (): void => {
    updateStateAndStorage(activeTodos);
  }

  return (
    <div className='App'>
      <header className='header'>
        <h1>Todos</h1>
      </header>

      <section className='todo-body'>
        <AddTodoItem {...{ addTodo }} />
        <div className='todo-list'>
          {showActiveTodos
            ? activeTodos.map(todo =>
              <TodoItem key={todo.createdAt} {...{
                todo,
                toggleTodoState,
                editTodo,
                deleteTodo,
              }} />)
            : null}
          {showCompletedTodos
            ? completedTodos.map(todo =>
              <TodoItem key={todo.createdAt} {...{
                todo,
                toggleTodoState,
                editTodo,
                deleteTodo
              }} />)
            : null}
        </div>
      </section>

      <hr/>

      <Footer {...{
        numActive: activeTodos.length,
        numCompleted: completedTodos.length,
        activeTodosExist: activeTodos.length > 0,
        completedTodosExist: completedTodos.length > 0,
        showActiveTodos,
        setShowActiveTodos,
        showCompletedTodos,
        setShowCompletedTodos,
        markAllComplete,
        deleteAllCompleted
      }} />
    </div>
  );
}

export default App;