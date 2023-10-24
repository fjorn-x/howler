import React from "react";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import {Avatar} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Verified from "@mui/icons-material/Verified";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MoreButton from "../Extra/MoreButton";
import ReplyModal from "./ReplyModal";
import {useDispatch} from "react-redux";
import {likeHowl, retweet} from "../../State/Howl/HowlSlice";

const HowlCard = ({item}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCopyLink = (e) => {
    console.log(e.view.location.href);
  };
  const handleCreateRetweet = () => {
    dispatch(retweet(item.id));
  };
  const handleLikeTweet = () => {
    dispatch(likeHowl(item.id));
  };
  return (
    <div className="border-b-2 p-3 pr-3">
      <div className="flex space-x-5">
        <Avatar
          className="cursor-pointer"
          alt="username"
          src="/images/profile.jpeg"
          onClick={() =>
            navigate(
              `/profile/${
                // item.howl.user.id
                2
              }`
            )
          }
        />
        <div className="w-full">
          <div className="flex justify-between items-start">
            <div
              className="flex cursor-pointer space-x-1"
              onClick={() =>
                navigate(
                  `/profile/${
                    // item.howl.user.id
                    2
                  }`
                )
              }
            >
              <span className="font-semibold hover:underline">{item.user.fullName}</span>
              <Verified className="text-[#b91c1c]" />

              <span className="text-gray-600 ">{item.user.fullName.toLowerCase().trim().replace(/\s/g, "_")}</span>
              <span className="text-gray-600">&#183; 2m</span>
            </div>
            <MoreButton />
          </div>
          <>
            <div
              className="cursor-pointer"
              onClick={() =>
                navigate(
                  `/${
                    // item.howl.user.id
                    2
                  }/post/${
                    // item.howl.id
                    1
                  }`
                )
              }
            >
              <p className="mb-2 p-0 w-full">{item.content}</p>
              <img src={item.image} alt="" className="w-full border border-gray-400 p-5 rounded-md" />
            </div>
          </>
          <div className="py-2 flex flex-wrap justify-between items-center">
            <div className="flex items-center text-gray-600">
              <ReplyModal />
              <p>{item.totalReplies}</p>
            </div>
            <div className={`${item.retweet ? "text-pink-600" : "text-gray-600"} space-x-3 flex items-center`}>
              <RepeatOutlinedIcon className="cursor-pointer" onClick={handleCreateRetweet} fontSize="small" />
              <p>{item.totalRetweets}</p>
            </div>
            <div className={`${item.liked ? "text-pink-600" : "text-gray-600"} space-x-3 flex items-center`}>
              {item.liked ? (
                <FavoriteIcon className="cursor-pointer" onClick={handleLikeTweet} fontSize="small" />
              ) : (
                <FavoriteBorderIcon className="cursor-pointer" onClick={handleLikeTweet} fontSize="small" />
              )}
              <p>{item.totalLikes}</p>
            </div>
            <div className="space-x-3 flex items-center text-gray-600">
              <BarChartOutlinedIcon className="cursor-pointer" fontSize="small" />
              <p>34</p>
            </div>
            <div className="space-x-3 flex items-center text-gray-600 mr-2">
              <FileUploadOutlinedIcon className="cursor-pointer " onClick={handleCopyLink} fontSize="small" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowlCard;
