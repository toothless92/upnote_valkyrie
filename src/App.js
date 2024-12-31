// App.js
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login/Login.js";
import NoteViewer from "./components/NoteSpace/NoteSpace.js";
import { AppProvider, useAppContext } from "./components/Context/Context.js";

const App = () => {
  const { token, setToken} =
    useAppContext();

  useEffect(() => {
    const storedToken =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    setToken(storedToken);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Route for Login */}
        <Route
          path="/"
          element={token ? <Navigate to="/notes" /> : <Login />}
        />

        {/* Private Route for NoteViewer */}
        <Route
          path="/notes"
          element={token ? <NoteViewer /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

// Wrap the app in the NoteProvider
const Root = () => (
  <AppProvider>
    <App />
  </AppProvider>
);

export default Root;
