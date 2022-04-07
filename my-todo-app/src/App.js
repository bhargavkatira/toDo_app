import "./App.css";
import { useState } from "react";
import { Todo } from "./components/Todo";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectRoute } from "./components/ProtectRoute";
function App() {
  const [user, setUser] = useState(false);

  // const handleLogin = () => setUser({ id: "1", name: "robin" });
  const handleLogout = () => setUser(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectRoute user={user}>
              <Todo />
            </ProtectRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
