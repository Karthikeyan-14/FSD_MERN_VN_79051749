import React, { useEffect, useState } from "react";
import { readUsers } from "./utils/storage";
import { Link } from "react-router-dom";

function UserCard({ user }) {
  return (
    <div className="card user-card">
      <div className="card-left">
        <img src={user.image} alt={user.name} />
      </div>
      <div className="card-right">
        <h3>{user.name}</h3>
        <p><strong>Age:</strong> {user.age || "-"}</p>
        <p><strong>Contact:</strong> {user.contact}</p>
        <p className="small">{user.basic}</p>
        <div className="card-actions">
          {/* open details in new tab using link with target="_blank" */}
          <Link to={`/users/${user.id}`} target="_blank" rel="noopener noreferrer">
            View Details 
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(readUsers());
    // add storage listener to update if other tab adds users
    const onStorage = (e) => {
      if (e.key === "users_app_data_v1") setUsers(readUsers());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <div>
      <h2>All Users ({users.length})</h2>
      {users.length === 0 ? (
        <div className="empty">No users yet. Add one from the form.</div>
      ) : (
        <div className="grid">
          {users.map(u => (
            <UserCard key={u.id} user={u} />
          ))}
        </div>
      )}
    </div>
  );
}
