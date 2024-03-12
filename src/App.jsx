import React, { useState } from 'react';
import "./App.css";
import TodoList from './TodoList.jsx';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', description: '', status: 'Not Completed' });
  const [filter, setFilter] = useState('All');
  const [editingIndex, setEditingIndex] = useState(null);

  const addTodo = () => {
    if (newTask.name.trim() === '') return;

    if (editingIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editingIndex] = { ...newTask };
      setTodos(updatedTodos);
      setEditingIndex(null);
    } else {
      setTodos([...todos, { ...newTask }]);
    }

    setNewTask({ name: '', description: '', status: 'Not Completed' });
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setNewTask({ ...todos[index] });
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setNewTask({ name: '', description: '', status: 'Not Completed' });
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    setEditingIndex(null); 
  };

  const filterTodos = (status) => {
    setFilter(status);
  };

  return (
    <div className='container'>
      <h1 className="text-center mb-4">TODO APP</h1>
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            className="form-control"
            type="text"
            placeholder="Enter task name"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <input
            className="form-control"
            type="text"
            placeholder="Enter description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          >
            <option value="Not Completed">Not Completed</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="col-md-1">
          <button
            type="button"
            className={`btn btn-primary ${editingIndex !== null ? 'd-none' : ''}`}
            onClick={addTodo}
          >
            Add Todo
          </button>
          {editingIndex !== null && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4">
          <select
            className="form-select"
            value={filter}
            onChange={(e) => filterTodos(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Not Completed">Not Completed</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {todos.map((todo, index) => (
              <div className="col" key={index}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{todo.name}</h5>
                    <p className="card-text">{todo.description}</p>
                    <p className="card-text">{todo.status}</p>
                    <div className="btn-group" role="group">
                      <button type="button" className="btn btn-primary" onClick={() => startEdit(index)}>Edit</button>
                      <button type="button" className="btn btn-danger" onClick={() => deleteTodo(index)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoApp;
