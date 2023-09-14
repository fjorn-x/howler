import {Grid} from "@mui/material";
import React from "react";
import Navigation from "../Navigation/Navigation";
import HomeFeed from "../HomeFeed/HomeFeed";

const HomePage = () => {
  return (
    <div>
      <Grid container className="px-5 lg:px-36 justify-between">
        <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative">
          <Navigation />
        </Grid>
        <Grid item xs={12} lg={6} className="hidden lg:block w-full relative">
          <HomeFeed />
        </Grid>
        <Grid item xs={0} lg={3} className="hidden lg:block w-full relative">
          <p className="text-center">Right</p>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
