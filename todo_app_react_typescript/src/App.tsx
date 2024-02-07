import React, { useEffect } from "react";
import "./App.css";

import { Routes, Route, useNavigate } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import Completed from "./pages/Completed/Completed";
import Pending from "./pages/Pending/Pending";
import RouteNavbar from "./layouts/RouteNavbar/RouteNavbar";

import { useAppSelector } from "./store/hooks";
import AuthenticatedRoute from "./authenticatedRoute/authenticatedRoute";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const access_token =
    useAppSelector((state) => state.login.user_login.access_token) || undefined;
  console.log("access_token", access_token);

  useEffect(() => {
    navigate("/login");
  }, []);


  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <AuthenticatedRoute>
              <RouteNavbar />
            </AuthenticatedRoute>
          }
        >
          <Route
            index
            element={
              <AuthenticatedRoute>
                <HomePage />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="completed"
            element={
              <AuthenticatedRoute>
                <Completed />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="pending"
            element={
              <AuthenticatedRoute>
                <Pending />
              </AuthenticatedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
