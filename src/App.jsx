import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Application load hote hi localStorage check karein
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Login successful hone par
  const handleLogin = (status) => {
    if (status === true) {
      setIsLoggedIn(true);
    }
  };

  // Logout hone par
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("todo_user");
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        // Yahan 'setLogged' ko function pass kar rahe hain
        <Login setLogged={handleLogin} />
      )}
    </div>
  );
}

export default App;