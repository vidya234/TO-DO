import { useState, useEffect } from 'react'; // Import useEffect
import './App.css';
import { Todos } from './components/Rendertodos';
import { CreateTodo } from './components/Createtodo';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todo")
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await res.json();
        setTodos(json.todos);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  }, []);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };
  const markAsDone = (id) => {
    const todoToUpdate = todos.find(todo => todo._id === id);
    if (!todoToUpdate) {
      return; // Todo item not found
    }


    const updatePayload = { id: todoToUpdate._id };


    fetch(`http://localhost:3000/completed`, {
      method: "PUT",
      body: JSON.stringify(updatePayload),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(response => {
      if (!response.ok) {
          throw new Error('Failed to mark todo as done');
      }
      return response.json();
  })
  .then(() => {
      // Update the local state only after the backend is updated
      setTodos(
          todos.map((todo) => (todo._id === id ? { ...todoToUpdate, completed: !todo.completed } : todo))
      );
  })

      .catch(error => {
        alert("Error marking todo as done: " + error.message);
      });
  };




  return (
    <div className="flex flex-col items-center bg-slate-500 min-h-screen p-10">
      <div className='text-3xl font-bold text-white mb-10'>Got a lot of things to do? Add a todo!</div>
      <CreateTodo onAdd={addTodo} />
      <div className="w-full max-w-md">
      <Todos todos={todos} onMarkAsDone={markAsDone} />

      </div>
    </div>
  );
}

export default App;

