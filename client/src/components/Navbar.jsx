import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">📝 NotesApp</h1>
        <button onClick={toggleTheme} className="theme-toggle" title="Toggle Theme">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
