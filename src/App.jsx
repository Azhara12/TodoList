import React, { useState, useEffect } from "react";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Application load hote hi localStorage check karein
  useEffect(() => {
    const savedStatus = localStorage.getItem("isLoggedIn");
    if (savedStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Login successful hone par
  const handleLogin = (status) => {
    if (status === true) {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    }
  };

  // Logout hone par
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
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