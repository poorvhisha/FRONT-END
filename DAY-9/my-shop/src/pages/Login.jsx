import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const texts = {
en: {
title: "FarmZen",
subtitle: "Fresh • Healthy • Direct from Farmers",
login: "Login",
email: "Email",
password: "Password",
},
ta: {
title: "FarmZen",
subtitle: "புதிய • ஆரோக்கியமான • விவசாயிகளிடமிருந்து",
login: "உள்நுழை",
email: "மின்னஞ்சல்",
password: "கடவுச்சொல்",
},
te: {
title: "FarmZen",
subtitle: "తాజా • ఆరోగ్యకరమైన • రైతుల నుండి",
login: "లాగిన్",
email: "ఇమెయిల్",
password: "పాస్‌వర్డ్",
},
ml: {
title: "FarmZen",
subtitle: "പുതിയത് • ആരോഗ്യകരം • കർഷകരിൽ നിന്ന്",
login: "ലോഗിൻ",
email: "ഇമെയിൽ",
password: "പാസ്‌വേഡ്",
},
kn: {
title: "FarmZen",
subtitle: "ತಾಜಾ • ಆರೋಗ್ಯಕರ • ರೈತರಿಂದ",
login: "ಲಾಗಿನ್",
email: "ಇಮೇಲ್",
password: "ಪಾಸ್ವರ್ಡ್",
},
};
const Login = () => {
const navigate = useNavigate();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [lang, setLang] = useState("en");
const t = texts[lang];
const handleLogin = () => {
const userEmail = email.trim().toLowerCase();
const userPassword = password.trim();
console.log("EMAIL:", userEmail);
console.log("PASSWORD:", userPassword);
if (
  userEmail === "poorvhisha0@gmail.com" &&
  userPassword === "poorvhi_12"
) {
  alert("Login Success");
  navigate("/products");
} else {
  alert("Invalid login");
}
};
return ( <div className="login-container">
{/* Language Selector */} <div className="language">
<select onChange={(e) => setLang(e.target.value)}> <option value="en">English</option> <option value="ta">Tamil</option> <option value="te">Telugu</option> <option value="ml">Malayalam</option> <option value="kn">Kannada</option> </select> </div>
  {/* Login Box */}
  <div className="login-box">
    <h1 className="logo">{t.title}</h1>
    <p className="subtitle">{t.subtitle}</p>
    <input
      type="email"
      placeholder={t.email}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <input
      type="password"
      placeholder={t.password}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button className="login-btn" onClick={handleLogin}>
      {t.login}
    </button>
  </div>
</div>
);
};
export default Login;
