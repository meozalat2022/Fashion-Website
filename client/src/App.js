import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";

function App() {
  const { loader } = useSelector((state) => state.loading);
  return (
    <div>
      {loader && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
