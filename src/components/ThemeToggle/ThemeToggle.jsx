import { useEffect, useState } from "react";

const ThemeToggle = () => {
  
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className="flex-none">
      <label className="swap swap-rotate">
       
        <input 
          type="checkbox" 
          onChange={handleToggle} 
          checked={theme === "dark"} 
        />
        
        <div className="swap-on">🌙</div> 
        
        <div className="swap-off">☀️</div>
      </label>
    </div>
  );
};

export default ThemeToggle;
