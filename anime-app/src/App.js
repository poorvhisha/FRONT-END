import React, { useState } from "react";
import "./Anime.css";
function Anime() {
  const animeData = [
    { title: "Naruto Uzumaki", desc: "Hokage | Sage Mode" },
    { title: "Itachi Uchiha", desc: "Sharingan | Genjutsu Master" },
    { title: "Gojo Satoru", desc: "Limitless | Six Eyes" },
    { title: "Levi Ackerman", desc: "Humanity's Strongest Soldier" },
    { title: "Eren Yeager", desc: "Attack Titan | Founder" },
    { title: "Goku", desc: "Ultra Instinct" },
    { title: "Luffy", desc: "Gear 5 Awakening" },
    { title: "Zoro", desc: "Three Sword Style" },
    { title: "Sasuke", desc: "Rinnegan | Lightning Style" }
  ];
  const [active, setActive] = useState(null);
  return (
    <div className="app">
      <h1 className="title">Anime Multiverse</h1>
      <div className="grid">
        {animeData.map((item, index) => (
          <div
            key={index}
            className={`card ${active === index ? "active" : ""}`}
            onClick={() => setActive(index)}
          >
            <div className="card-content">
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Anime;