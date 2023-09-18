import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {useNavigate} from "react-router-dom";
import {Avatar, Box, Button, Tab} from "@mui/material";
import Verified from "@mui/icons-material/Verified";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import HowlCard from "../HomeFeed/HowlCard";
import ProfileModal from "./ProfileModal";

const Profile = () => {
  const [value, setValue] = React.useState("1");
  const navigate = useNavigate();
  const handleBack = () => navigate("/");
  const handleOpenProfileModal = () => {
    console.log("Open Profile Modal");
  };
  const handleFollowUser = () => {
    console.log("follow user");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="border-x p-0 ">
      <section className="pl-4 z-50 flex items-center sticky top-0 bg-opacity-95 bg-white">
        <KeyboardBackspaceIcon className="cursor-pointer" onClick={handleBack} />
        <div className="ml-6 opacity-90 py-1 ">
          <h1 className="text-xl font-bold">Hamza Shaikh</h1>
          <p className="text-gray-500 font-size text-sm">0 posts</p>
        </div>
      </section>
      <section>
        <img
          className="w-[100%] h-[10rem] object-cover"
          src="https://images.unsplash.com/photo-1519060825752-c4832f2d400a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWVzdGhldGljfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
      </section>
      <section className="px-5">
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-20"
            alt="username"
            src="/images/profile.jpeg"
            sx={{width: "9rem", height: "9rem", border: `4px solid ${"white"}`}}
          />
          {true ? (
            <Button
              variant="outlined"
              sx={{borderRadius: "20px"}}
              onClick={handleOpenProfileModal}
              className="mr-2"
            >
              Edit Profile
            </Button>
          ) : (
            <Button variant="outlined" sx={{borderRadius: "20px"}} onClick={handleFollowUser}>
              {true ? "Follow" : "Unfollow"}
            </Button>
          )}
        </div>
        <div>
          <div className="flex items-center space-x-1">
            <h1 className="font-bold text-lg">Hamza Shaikh</h1>
            {true && <Verified className="text-[#b91c1c]" />}
          </div>
          <h1 className="text-gray-500">@hamzashaikh</h1>
        </div>
        <div className="mt-2 space-y-3">
          <p className="text-md">My Twitter Bio</p>
          <div className=" flex space-x-4">
            <div className="flex items-center text-gray-500">
              <BusinessCenterIcon fontSize="small" />
              <p className="ml-1 text-sm">Developer</p>
            </div>
            <div className="flex items-center text-gray-500">
              <LocationOnIcon fontSize="small" />
              <p className="ml-1 text-sm">India</p>
            </div>
            <div className="flex items-center text-gray-500">
              <CalendarMonthIcon fontSize="small" />
              <p className="ml-1 text-sm">Joined September 2023</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 font-semibold">
              <span className="font-bold text-sm">100</span>
              <span className="text-gray-500 text-sm">Following</span>
            </div>
            <div className="flex items-center space-x-1 font-semibold">
              <span className="font-bold text-sm">100</span>
              <span className="text-gray-500 text-sm">Followers</span>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <Box sx={{width: "100%", typography: "body1"}}>
          <TabContext value={value}>
            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
              <TabList
                onChange={handleChange}
                aria-label="Tabs on Profile"
                indicatorColor="primary"
                centered
                variant="fullWidth"
              >
                <Tab label="Posts" value="1" />
                <Tab label="Replies" value="2" />
                <Tab label="Media" value="3" />
                <Tab label="Likes" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1" className="no-padding">
              {[1, 1, 1, 1].map((item) => (
                <HowlCard />
              ))}
            </TabPanel>
            <TabPanel value="2">Replies</TabPanel>
            <TabPanel value="3">Media</TabPanel>
            <TabPanel value="4">Likes</TabPanel>
          </TabContext>
        </Box>
      </section>
      <section>
        <ProfileModal />
      </section>
    </div>
  );
};

export default Profile;
