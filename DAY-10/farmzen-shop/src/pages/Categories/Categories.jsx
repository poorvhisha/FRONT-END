import "./Categories.css";

const Categories = () => {
  const data = ["Fruits", "Vegetables", "Dairy"];

  return (
    <div className="categories container">
      <h1>Categories</h1>

      <div className="grid">
        {data.map((item, i) => (
          <div key={i} className="card">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;