import "./App.css";
import { useState } from "react";

// Todo App
function App() {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");

  const handleBtn = () => {
    if (todo.trim() === "") return;

    const newTodo = {
      id: Math.random(),
      todo: todo,
      completed: false,
      date: new Date().toLocaleDateString(),
    };
    setTodoList([...todoList, newTodo]);
    setTodo("");
  };

  const handleDone = (id) => {
    return () => {
      const updatedTodoList = todoList.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      });
      setTodoList(updatedTodoList);
    };
  };

  // Handle Enter key press for input field
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBtn();
    }
  };

  return (
    <div className="todo">
      <div className="App">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleBtn}>Enter</button>
      </div>
      <div>
        <ul className="tasks">
          {todoList.map((item) => (
            <li key={item.id} style={{
              backgroundColor: item.completed ? "Green" : "",
            }}>
              <span
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}
              >
                {item.todo}
              </span>{" "}
              <span>{item.date} </span>
              <button
                onClick={handleDone(item.id)}
              >
                {item.completed ? "Pending" : "Done"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
