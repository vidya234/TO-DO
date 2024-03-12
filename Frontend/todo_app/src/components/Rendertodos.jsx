export function Todos({ todos, onMarkAsDone }) {
  return (
    <div className="flex flex-col items-center">
      {todos.map((todo) => (
        <div className="bg-white shadow-md rounded-lg p-4 m-2 w-full max-w-md">
          <h1 className="text-lg font-bold">{todo.title}</h1>
          <p className="text-sm text-gray-600">{todo.description}</p>
          <button
            className={`mt-2 py-2 px-4 rounded ${
              todo.completed ? "bg-green-500 text-white" : "bg-slate-700 text-white"
            }`}
            onClick={() => onMarkAsDone(todo._id)}

          >
            {todo.completed ? "Completed" : "Mark as done"}
          </button>
        </div>
      ))}
    </div>
  );
}
