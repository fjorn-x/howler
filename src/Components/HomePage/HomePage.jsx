import {Grid} from "@mui/material";
import React from "react";
import Navigation from "../Navigation/Navigation";
import HomeFeed from "../HomeFeed/HomeFeed";
import Extra from "../Extra/Extra";
import {Route, Routes} from "react-router-dom";
import Profile from "../Profile/Profile";
import PostDetails from "../PostDetails/PostDetails";

const HomePage = () => {
  return (
    <div>
      <Grid container className="px-5 md:px-20 justify-between overscroll-none">
        <Grid item xs={0} lg={2.5} className="pl-6 xl:block w-full relative">
          <Navigation />
        </Grid>
        <Grid item xs={12} lg={6} className="pr-3 hidden lg:block w-full relative">
          <Routes>
            <Route path="/" element={<HomeFeed />}></Route>
            <Route path="/profile/:userId" element={<Profile />}></Route>
            <Route path="/:userId/post/:postId" element={<PostDetails />}></Route>
          </Routes>
        </Grid>
        <Grid item xs={0} lg={3} className="hidden xl:block w-full relative">
          <Extra />
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
