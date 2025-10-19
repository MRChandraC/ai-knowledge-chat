import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <>
      {/* Toast container */}
      <Toaster position="top-right" reverseOrder={false} />

      <Router>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/chat/:docId"
            element={isLoggedIn ? <Chat /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </>
  );
}


export default App;
