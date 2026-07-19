import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";

import store from "./redux/store";
import AppRoutes from "./routes/AppRoutes";
import Splash from "./pages/Splash/Splash";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <Provider store={store}>
      {loading ? <Splash /> : <AppRoutes />}
    </Provider>
  );
};

export default App;