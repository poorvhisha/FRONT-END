import "./EmptyState.css";

const EmptyState = ({ message }) => {
  return (
    <div className="empty">
      <div className="empty-box">
        <h3>{message}</h3>
      </div>
    </div>
  );
};

export default EmptyState;