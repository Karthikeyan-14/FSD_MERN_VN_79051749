import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import UserForm from "./components/UserForm";
import UsersPage from "./components/UserPage";
import UserDetails from "./components/UserDetails";

export default function App() {
  return (
    <div className="app">
      <header className="topbar">
        <h1>Simple Users App</h1>
        <nav>
          <Link to="/">Submit Form</Link>
          <Link to="/users">Users</Link>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </main>
    </div>
  );
}
