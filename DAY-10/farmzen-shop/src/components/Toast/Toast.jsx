import { useEffect, useState } from "react";
import "./Toast.css";

const Toast = ({ message, duration = 2000 }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!show) return null;

  return <div className="toast">{message}</div>;
};

export default Toast;