/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {useNavigate, useParams} from "react-router-dom";
import {Avatar, Box, Button, Tab} from "@mui/material";
import Verified from "@mui/icons-material/Verified";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import HowlCard from "../HomeFeed/HowlCard";
import ProfileModal from "./ProfileModal";
import {useDispatch, useSelector} from "react-redux";
import {followUser, getUserById} from "../../State/Auth/AuthSlice";
import {getAllHowls, getAllReplyHowls, getUserHowls, getUserLikeHowls} from "../../State/Howl/HowlSlice";
import PublicIcon from "@mui/icons-material/Public";

const Profile = () => {
  const [value, setValue] = React.useState("1");
  const navigate = useNavigate();
  const handleBack = () => navigate("/");
  const {howl, auth} = useSelector((store) => store);
  const dispatch = useDispatch();
  const userId = useParams().userId;

  const handleFollowUser = () => {
    dispatch(followUser(userId));
    console.log("follow user");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const flag = userId == auth.user.id;
  console.log("flag", flag);
  useEffect(() => {
    dispatch(getUserById(userId));
    dispatch(getAllHowls());
    dispatch(getAllReplyHowls());
    dispatch(getUserHowls(userId));
    dispatch(getUserLikeHowls(userId));
  }, [howl.like, howl.retweet, howl.howl, userId, auth.update]);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return (
    <div className="border-x p-0 ">
      <section className="pl-4 z-50 flex items-center sticky top-0 bg-opacity-95 bg-white">
        <KeyboardBackspaceIcon className="cursor-pointer" onClick={handleBack} />
        <div className="ml-6 opacity-90 py-1 ">
          <h1 className="text-xl font-bold">{auth.findUser?.fullName}</h1>
          <p className="text-gray-500 font-size text-sm">
            {Object.keys(howl.howls.filter((item) => item.user.id === auth.findUser?.id)).length} posts
          </p>
        </div>
      </section>
      <section>
        <img
          className="w-[100%] h-[10rem] object-cover"
          src={
            auth.findUser?.bannerImage ||
            "https://images.unsplash.com/photo-1461696114087-397271a7aedc?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWVzdGhldGljfGVufDB8fDB8fHww"
          }
          alt="Banner"
        />
      </section>
      <section className="px-5">
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-20"
            alt={auth.findUser?.fullName}
            src={auth.findUser?.profileImage === null ? "null" : auth.findUser?.profileImage}
            sx={{bgcolor: "#b91c1c", width: "9rem", height: "9rem", border: `4px solid ${"white"}`}}
          />
          {auth.findUser?.req_user ? (
            <ProfileModal />
          ) : (
            <Button variant="outlined" sx={{borderRadius: "20px"}} onClick={handleFollowUser}>
              {!auth?.findUser?.followed ? "Follow" : "Unfollow"}
            </Button>
          )}
        </div>
        <div>
          <div className="flex items-center space-x-1">
            <h1 className="font-bold text-lg">{auth.findUser?.fullName}</h1>
            {true && <Verified className="text-[#b91c1c]" />}
          </div>
          <h1 className="text-gray-500">@{auth.findUser?.fullName.toLowerCase().trim().replace(/\s/g, "_")}</h1>
        </div>
        <div className="mt-2 space-y-3">
          {auth.findUser?.bio && <p className="text-md">{auth.findUser?.bio}</p>}
          <div className=" flex flex-wrap">
            {auth.findUser?.profession && (
              <div className="flex items-center text-gray-500 mr-4">
                <BusinessCenterIcon fontSize="small" />
                <p className="ml-1 text-sm">{auth.findUser?.profession}</p>
              </div>
            )}
            {auth.findUser?.location && (
              <div className="flex items-center text-gray-500 mr-4">
                <LocationOnIcon fontSize="small" />
                <p className="ml-1 text-sm">{auth.findUser?.location}</p>
              </div>
            )}
            <div className="flex items-center text-gray-500 mr-4">
              <CalendarMonthIcon fontSize="small" />
              <p className="ml-1 text-sm">
                Joined {months[new Date().getMonth() - 1]} {new Date().getFullYear()}
              </p>
            </div>
            {auth.findUser?.website && (
              <div className="flex items-center underline text-gray-500 mr-4">
                <PublicIcon fontSize="small" />
                <a href={auth.findUser?.website} target="_blank" className="ml-1 text-sm">
                  {auth.findUser?.website}
                </a>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 font-semibold">
              <span className="font-bold text-sm">{auth.findUser?.followings.length}</span>
              <span className="text-gray-500 text-sm">Following</span>
            </div>
            <div className="flex items-center space-x-1 font-semibold">
              <span className="font-bold text-sm">{auth.findUser?.followers.length}</span>
              <span className="text-gray-500 text-sm">Followers</span>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <Box sx={{width: "100%", typography: "body1"}}>
          <TabContext value={value}>
            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
              <TabList onChange={handleChange} aria-label="Tabs on Profile" indicatorColor="primary" centered variant="fullWidth">
                <Tab label="Posts" value="1" />
                <Tab label="Replies" value="2" />
                <Tab label="Media" value="3" />
                <Tab label="Likes" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1" className="no-padding">
              {howl.howls
                .filter((item) => item.user.id === auth.findUser?.id)
                .map((item) => (
                  <HowlCard item={item} />
                ))}

              {howl.retweetHowls
                .filter((item) => item.retweetUsersId.includes(auth.findUser?.id) && item.user.id !== auth.findUser?.id)
                .map((item) => (
                  <HowlCard item={item} isRetweet={true} />
                ))}
            </TabPanel>
            <TabPanel value="2" className="no-padding">
              {howl?.replyHowls
                ?.filter((howl) => howl.user.id === auth.findUser?.id)
                .map((item) => (
                  <HowlCard item={item} />
                ))}
            </TabPanel>
            <TabPanel value="3" className="no-padding">
              {howl.howls
                .filter((item) => item.user.id === auth.findUser?.id)
                .filter((item) => item.image)
                .map((item) => (
                  <HowlCard item={item} />
                ))}
            </TabPanel>
            <TabPanel value="4" className="no-padding">
              {howl?.likedHowls
                ?.filter((howl) => howl.user.id !== auth.findUser?.id)
                ?.map((item) => (
                  <HowlCard item={item} />
                ))}
            </TabPanel>
          </TabContext>
        </Box>
      </section>
    </div>
  );
};

export default Profile;
