import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  // Check local storage or system preference on initial load
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark",
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  useEffect(() => {
    // Apply the theme to the root HTML element
    document.querySelector("html").setAttribute("data-theme", theme);
    // Save preference so it persists on refresh
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
      {theme === "light" ? (
        <Sun size={20} className="text-yellow-400" />
      ) : (
        <Moon size={20} className="text-neutral-700" />
      )}
    </button>
  );
};

export default ThemeToggle;
