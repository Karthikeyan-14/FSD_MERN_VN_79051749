import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "./utils/storage";


function readFileAsDataURL(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}

export default function UserForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    age: "",
    address: "",
    contact: "",
    basic: ""
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImageFile(null);
      setImagePreview(null);
      return;
    }
    // optional: small validation
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }
    setImageFile(file);
    const dataUrl = await readFileAsDataURL(file);
    setImagePreview(dataUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // basic validations
    if (!form.name.trim()) return setError("Name is required.");
    if (!form.contact.trim()) return setError("Contact is required.");
    if (!imageFile) return setError("Please upload an image.");

    const imageDataUrl = await readFileAsDataURL(imageFile);

    const newUser = {
      id: Date.now().toString(), // simple id
      ...form,
      image: imageDataUrl,
      createdAt: new Date().toISOString()
    };

    addUser(newUser);

    // after submit, go to users page
    navigate("/users");
  };

  return (
    <div className="card form-card">
      <h2>Submit User</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} />
        </label>

        <label>
          Age
          <input name="age" value={form.age} onChange={handleChange} type="number" />
        </label>

        <label>
          Contact
          <input name="contact" value={form.contact} onChange={handleChange} />
        </label>

        <label>
          Address
          <input name="address" value={form.address} onChange={handleChange} />
        </label>

        <label>
          Basic Data
          <input name="basic" value={form.basic} onChange={handleChange} />
        </label>

        <label>
          Upload Image
          <input type="file" accept="image/*" onChange={handleImage} />
        </label>

        {imagePreview && (
          <div className="preview">
            <img src={imagePreview} alt="preview" />
          </div>
        )}

        {error && <div className="error">{error}</div>}

        <div className="actions">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
