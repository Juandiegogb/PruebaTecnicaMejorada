import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { AdminPage } from "./pages/AdminPage";
import { UserPage } from "./pages/UserPage";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
