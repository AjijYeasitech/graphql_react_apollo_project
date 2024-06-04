import { Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/register.js";
import Login from "./pages/login.js";
import Home from "./pages/home.js";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => ({ ...state?.user }));
  const token = user?.token;
  console.log("token", token);

  return (
    <div className="dark">
      <Routes>
        <Route
          exact
          path="/"
          element={token ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/register"
          element={!token ? <Register /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
