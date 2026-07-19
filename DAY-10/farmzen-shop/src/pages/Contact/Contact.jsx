import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact container">
      <h1>Contact Us</h1>
      <input type="text" placeholder="Your Name" />
      <input type="email" placeholder="Email" />
      <textarea placeholder="Message"></textarea>
      <button className="btn">Send</button>
    </div>
  );
};

export default Contact;