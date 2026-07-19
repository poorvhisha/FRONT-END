import "./CategoryCard.css";

const CategoryCard = ({ category }) => {
  return (
    <div className="category-card">
      <div className="category-image">
        <img src={category.image} alt={category.name} />
      </div>

      <div className="category-content">
        <h3>{category.name}</h3>
        <p>{category.description}</p>
      </div>
    </div>
  );
};

export default CategoryCard;