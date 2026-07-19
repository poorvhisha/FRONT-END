import "./Settings.css";

const Settings = () => {
  return (
    <div className="settings container">
      <h1>Settings ⚙️</h1>

      <div className="card">
        <p>Dark Mode</p>
        <button
          className="btn"
          onClick={() => document.body.classList.toggle("dark")}
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default Settings;