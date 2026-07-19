import "./Breadcrumb.css";

const Breadcrumb = ({ path }) => {
  return (
    <div className="breadcrumb">
      {path.map((item, index) => (
        <span key={index} className="crumb">
          {item}
          {index !== path.length - 1 && (
            <span className="separator">›</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;