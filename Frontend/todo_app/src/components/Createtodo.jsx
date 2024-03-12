import { useState } from "react";

export function CreateTodo({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTodo = () => {
    setIsLoading(true);
    fetch("http://localhost:3000/todo", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(async function (res) {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await res.json();
        setTitle("");
        setDescription("");
        onAdd({
          title,description
        }); // This should update the local state and re-render the component
        alert("Todo added");
      })
      .catch(error => {
        alert("Error adding todo: " + error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 m-2 border rounded"
        disabled={isLoading}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 m-2 border rounded"
        disabled={isLoading}
      />
      <button
        onClick={handleAddTodo}
        className="bg-slate-700 text-white p-2 m-2 rounded"
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add a Todo"}
      </button>
    </div>
  );
}
