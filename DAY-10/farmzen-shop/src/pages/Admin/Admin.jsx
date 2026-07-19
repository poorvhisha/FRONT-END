import React, { useState, useEffect } from "react";
import "./Admin.css";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [editId, setEditId] = useState(null); // 🔥 NEW

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(data);
  }, []);

  const saveProducts = (data) => {
    localStorage.setItem("products", JSON.stringify(data));
    setProducts(data);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) reader.readAsDataURL(file);
  };

  // 🔥 ADD / UPDATE
  const handleSubmit = () => {
    if (!name || !price || !category || !image) {
      alert("Fill all fields");
      return;
    }

    if (editId) {
      // UPDATE
      const updated = products.map((p) =>
        p.id === editId ? { ...p, name, price, category, image } : p
      );
      saveProducts(updated);
      setEditId(null);
    } else {
      // ADD
      const newProduct = {
        id: Date.now(),
        name,
        price,
        category,
        image,
      };
      saveProducts([...products, newProduct]);
    }

    // RESET
    setName("");
    setPrice("");
    setCategory("");
    setImage("");
  };

  // 🔥 EDIT CLICK
  const handleEdit = (p) => {
    setName(p.name);
    setPrice(p.price);
    setCategory(p.category);
    setImage(p.image);
    setEditId(p.id);
  };

  const handleDelete = (id) => {
    const filtered = products.filter((p) => p.id !== id);
    saveProducts(filtered);
  };

  return (
    <div className="admin">
      <div className="sidebar">
        <h2>FarmZen Admin</h2>
        <p>Dashboard</p>
        <p>Products</p>
      </div>

      <div className="main">
        <h1>Admin Dashboard</h1>

        {/* FORM */}
        <div className="form">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Category</option>
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
            <option value="dairy">Dairy</option>
          </select>

          <input type="file" onChange={handleImage} />

          <button onClick={handleSubmit}>
            {editId ? "Update" : "Add"}
          </button>
        </div>

        {/* PREVIEW */}
        {image && (
          <div className="preview">
            <img src={image} alt="preview" />
          </div>
        )}

        {/* PRODUCTS */}
        <div className="grid">
          {products.map((p) => (
            <div className="card" key={p.id}>
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p>₹{p.price}</p>
              <span>{p.category}</span>

              <div className="actions">
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;