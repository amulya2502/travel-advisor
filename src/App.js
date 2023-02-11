import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Detail } from "./pages/Detail";
import { AddEditBlog } from "./pages/AddEditBlog";
import About from "./pages/About";
import { NotFound } from "./pages/NotFound";
import Home from "./pages/Home";
import { Auth } from "./pages/Auth";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import Blogs from "./pages/Blogs";
import "./style.scss";

const App = () => {
  const [active, setActive] = useState("home");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      navigate("/auth");
    });
  };

  return (
    <div>
      <ToastContainer position="top-center" />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              active={active}
              setActive={setActive}
              user={user}
              handleLogout={handleLogout}
            />
          }
        ></Route>
        <Route path="/detail/:id" element={<Detail  setActive={setActive}/>}></Route>
        <Route
          path="/create"
          element={
            user?.uid ? (
              <AddEditBlog user={user}  />
            ) : (
              <Navigate to="/"></Navigate>
            )
          }
        ></Route>
        <Route path="/update/:id"  element={
            user?.uid ? (
              <AddEditBlog user={user} setActive={setActive}/>
            ) : (
              <Navigate to="/"></Navigate>
            )
          }
        ></Route>
        <Route
          path="/detail/:id"
          element={<Detail setActive={setActive} user={user} />}
        />
        <Route path="/auth" element={<Auth setActive={setActive} setUser={setUser}/>}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/blogs" element={<Blogs setActive={setActive} user={user} /> }></Route>
        <Route path="#" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
};

export default App;
