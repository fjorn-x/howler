import React from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import {Button, Divider, Grid} from "@mui/material";
import {GoogleLogin} from "@react-oauth/google";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const Authentication = () => {
  const location = useLocation();
  return (
    <div>
      <Grid className="overscroll-none" container>
        <Grid className="hidden lg:block" item lg={7}>
          <img
            className="w-full h-screen object-cover "
            src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGFlc3RldGljJTIwYWJzdHJhY3R8ZW58MHx8MHx8fDA%3D&w=500"
            alt=""
          />
          <div className="absolute top-[50%] left-[19%] text-white text-6xl font-extrabold">HOWLER</div>
        </Grid>
        <Grid className="px-10 py-28 space-y-20" item lg={5} xs={12}>
          <h1 className="text-5xl font-bold">Find Your Wolf Pack</h1>
          <h1 className="text-3xl font-bold ">Join Today.</h1>
          <div className="w-[60%]">
            <div className="w-full space-y-2 mb-20">
              <div className="flex justify-center items-center">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  size="large"
                  type="icon"
                  shape="pill"
                />
              </div>
              <Divider>or</Divider>
              <SignupModal />
              <p className="text-xs leading-none text-gray-500">
                By signing up, you agree to be Respectful towards other users, including Cookie Use.
              </p>
            </div>
            <div>
              <h1 className="font-bold text-xl mb-2">Already have an account?</h1>
              <LoginModal />
            </div>
          </div>
        </Grid>
      </Grid>

      {/* <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes> */}
    </div>
  );
};

export default Authentication;
