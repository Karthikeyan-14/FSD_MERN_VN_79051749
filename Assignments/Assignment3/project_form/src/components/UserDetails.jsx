import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "./utils/storage";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = getUserById(id);
    setUser(u);
  }, [id]);

  if (!user) {
    return (
      <div className="card">
        <h3>User not found</h3>
        <p>This user may have been removed or the id is invalid.</p>
        <button onClick={() => navigate("/users")}>Back to Users</button>
      </div>
    );
  }

  return (
    <div className="card details-card">
      <div className="details-header">
        <img src={user.image} alt={user.name} className="details-image" />
        <div>
          <h2>{user.name}</h2>
          <p><strong>Contact:</strong> {user.contact}</p>
          <p><strong>Age:</strong> {user.age || "-"}</p>
          <p><strong>Submitted:</strong> {new Date(user.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <div className="details-body">
        <h4>Address</h4>
        <p>{user.address || "-"}</p>

        <h4>Basic Data</h4>
        <p>{user.basic || "-"}</p>
      </div>

      <div className="actions">
        <button onClick={() => window.print()}>Print</button>
      </div>
    </div>
  );
}
