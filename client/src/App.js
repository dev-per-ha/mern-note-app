import React from "react";
import './App.css';
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import { useTheme } from "./context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import Navbar from "./components/Navbar"; 

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen px-4 py-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
     <Navbar/>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notes App</h1>
        <button onClick={toggleTheme} className="text-xl">
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </div>
      <NoteForm />
      <NoteList />
    </div>
  );
}

export default App;
