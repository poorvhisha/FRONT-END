import "./Filter.css";

const Filter = ({ categories, selected, onChange }) => {
  return (
    <div className="filter">
      <label>Category:</label>

      <select value={selected} onChange={onChange}>
        <option value="">All</option>

        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;