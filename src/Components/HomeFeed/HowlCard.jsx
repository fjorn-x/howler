import React from "react";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import {Alert, Avatar, Snackbar, Tooltip} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Verified from "@mui/icons-material/Verified";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MoreButton from "../Extra/MoreButton";
import ReplyModal from "./ReplyModal";
import {useDispatch} from "react-redux";
import {likeHowl, retweet} from "../../State/Howl/HowlSlice";
import CopyToClipboard from "react-copy-to-clipboard";

const HowlCard = ({item}) => {
  const [copy, setCopy] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const linkToCopy = `http://localhost:3000/${item?.user?.id}/post/${item?.id}`;

  const handleCopyLink = (text, result) => {
    setCopy(true);
    console.log(`${text},${result}`);
  };

  const handleClose = (event, reason) => {
    setCopy(false);
  };
  const handleCreateRetweet = () => {
    dispatch(retweet(item?.id));
  };
  const handleLikeTweet = () => {
    dispatch(likeHowl(item?.id));
  };
  return (
    <div className="border-b-2 p-3 pr-3">
      <div className="flex space-x-5">
        <Avatar
          sx={{bgcolor: "#b91c1c"}}
          alt={item?.user.fullName}
          src={item?.user.profileImage === null ? "null" : item?.user.profileImage}
          className="cursor-pointer"
          onClick={() => navigate(`/profile/${item?.user?.id}`)}
        />
        <div className="w-full">
          <div className="flex justify-between items-start">
            <div className="flex cursor-pointer space-x-1" onClick={() => navigate(`/profile/${item?.user?.id}`)}>
              <span className="font-semibold hover:underline">{item?.user?.fullName}</span>
              <Verified className="text-[#b91c1c]" />

              <span className="text-gray-600 ">{item?.user?.fullName.toLowerCase().trim().replace(/\s/g, "_")}</span>
              <span className="text-gray-600">&#183; 2m</span>
            </div>
            <MoreButton />
          </div>
          <>
            <div className="cursor-pointer" onClick={() => navigate(`/${item?.user?.id}/post/${item?.id}`)}>
              <p className="mb-2 p-0 w-full">{item?.content}</p>
              {item?.image && <img src={item?.image} alt="" className="w-full border border-gray-400 p-5 rounded-md" />}
            </div>
          </>
          <div className="py-2 flex flex-wrap justify-between items-center">
            <div className="flex items-center text-gray-600">
              <ReplyModal item={item} />
              <p>{item?.totalReplies}</p>
            </div>
            <div className={`${item?.retweet ? "text-pink-600" : "text-gray-600"} space-x-3 flex items-center`}>
              <RepeatOutlinedIcon className="cursor-pointer" onClick={handleCreateRetweet} fontSize="small" />
              <p>{item?.totalRetweets}</p>
            </div>
            <div className={`${item?.liked ? "text-pink-600" : "text-gray-600"} space-x-3 flex items-center`}>
              {item?.liked ? (
                <FavoriteIcon className="cursor-pointer" onClick={handleLikeTweet} fontSize="small" />
              ) : (
                <FavoriteBorderIcon className="cursor-pointer" onClick={handleLikeTweet} fontSize="small" />
              )}
              <p>{item?.totalLikes}</p>
            </div>
            <div className="space-x-3 flex items-center text-gray-600">
              <BarChartOutlinedIcon className="cursor-pointer" fontSize="small" />
              <p>34</p>
            </div>
            <div className="space-x-3 flex items-center text-gray-600 mr-2">
              <CopyToClipboard text={linkToCopy} onCopy={handleCopyLink}>
                <Tooltip title="Copy Link">
                  <FileUploadOutlinedIcon className="cursor-pointer" fontSize="small" />
                </Tooltip>
              </CopyToClipboard>
              <Snackbar open={copy} autoHideDuration={1000} onClose={handleClose}>
                {copy && (
                  <Alert onClose={handleClose} severity="success" sx={{width: "100%"}}>
                    Link to Howl Copied
                  </Alert>
                )}
              </Snackbar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowlCard;
