/* eslint-disable react-hooks/exhaustive-deps */
import {Route, Routes} from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage/HomePage";
import Authentication from "./Components/Authentication/Authentication";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile} from "./State/Auth/AuthSlice";

function App() {
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector((store) => store.auth);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (jwt) {
      dispatch(getUserProfile(jwt));
    }
  }, [auth.jwt]);
  return (
    <div className="">
      <Routes>
        <Route path="/*" element={auth.user ? <HomePage /> : <Authentication />}></Route>
      </Routes>
    </div>
  );
}

export default App;
