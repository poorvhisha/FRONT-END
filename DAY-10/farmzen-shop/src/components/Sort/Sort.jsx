import "./Sort.css";

const Sort = ({ value, onChange }) => {
  return (
    <div className="sort">
      <select value={value} onChange={onChange}>
        <option value="">Sort By</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>
    </div>
  );
};

export default Sort;