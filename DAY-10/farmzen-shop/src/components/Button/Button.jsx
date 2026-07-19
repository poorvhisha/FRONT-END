import "./Button.css";

const Button = ({ text, onClick, type = "button", variant = "primary" }) => {
  return (
    <button
      className={`btn ${variant}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;