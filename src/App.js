import {Route, Routes, useNavigate} from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage/HomePage";
import Authentication from "./Components/Authentication/Authentication";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile} from "./State/Auth/AuthActions";

function App() {
  const jwt = localStorage.getItem("jwt");
  const {auth} = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("useEffect");
    if (jwt) {
      dispatch(getUserProfile(jwt));
      console.log("when", new Date().getUTCHours());
      navigate("/");
    }
    // eslint-disable-next-line
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
