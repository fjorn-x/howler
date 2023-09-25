import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";

import MoreButton from "./MoreButton";
import SubscriptionModal from "./SubsciptionModal";

const Extra = () => {
  const handleChangeTheme = () => {
    console.log("change theme");
  };
  return (
    <div className="py-2 sticky top-0">
      <section>
        <div className="relative flex items-center">
          <input
            type="text"
            className="py-1 rounded-full text-gray-500 w-full pl-10 border  "
            placeholder="Search"
          />
          <div className="absolute left-0 pl-2">
            <SearchIcon className="text-gray-500" size="small" />
          </div>
          <Brightness4Icon
            className="ml-3 cursor-pointer"
            size="small"
            onClick={handleChangeTheme}
          />
        </div>
      </section>
      <section className="my-5 pl-2">
        <h1 className="text-xl font-bold">Subscribe to Premium</h1>
        <h1 className="my-2 font-bold text-sm">
          Subscribe to unlock new features and if eligible, receive a share of ads revenue.
        </h1>
        {/* <Button
          variant="contained"
          sx={{padding: "10px", paddingX: "20px", borderRadius: "25px", bgcolor: "#b91c1c"}}
        >
          Subscribe
        </Button> */}
        <SubscriptionModal />
      </section>
      <section className="mt-7 space-y-4 pl-2">
        <h1 className="font-bold text-xl ">What's happening</h1>
        <div className="flex justify-between w-full">
          <div>
            <p className="text-sm text-gray-500">Movies · LIVE</p>
            <p className="font-bold">Toronto International Film Festival 2023</p>
            <p className="text-sm text-gray-500">Trending with #TIFF23</p>
          </div>
          <MoreButton />
        </div>
        {[1, 1, 1].map((item) => (
          <div className="flex justify-between w-full">
            <div>
              <p className="text-sm text-gray-500">Trending in India</p>
              <p className="font-bold">#LeoUpdate</p>
              <p className="text-sm text-gray-500">1639 posts</p>
            </div>
            <MoreButton />
          </div>
        ))}
      </section>
      {/* Who to follow section */}
      {/* <section className="space-y-4 mt-7">
        <h1 className="font-bold text-xl ">Who to follow</h1>
        <div className="flex items-center justify-between">
          <div></div>
          <Button variant="contained" sx={{bgcolor: "black", color: "white"}}>
            Follow
          </Button>
        </div>
      </section> */}
    </div>
  );
};

export default Extra;
