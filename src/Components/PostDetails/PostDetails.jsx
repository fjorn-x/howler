/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {useNavigate, useParams} from "react-router-dom";
import HowlCard from "../HomeFeed/HowlCard";
import {Divider} from "@mui/material";
import {findHowlById} from "../../State/Howl/HowlSlice";
import {useDispatch, useSelector} from "react-redux";

const PostDetails = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const dispatch = useDispatch();
  const id = useParams().postId;
  const {howl} = useSelector((store) => store);
  useEffect(() => {
    if (id) {
      dispatch(findHowlById(id));
    }
  }, [howl.like, howl.retweet]);
  return (
    <div className="border-x-2">
      <section className="pl-4 z-50 flex items-center sticky top-0 bg-opacity-95 bg-white pb-4 pt-2">
        <KeyboardBackspaceIcon className="cursor-pointer" onClick={handleBack} />
        <div className="ml-6 opacity-90 ">
          <h1 className="text-xl font-bold">Post</h1>
        </div>
      </section>
      <section>
        <HowlCard item={howl.howl} />
        <Divider />
      </section>
      <section>
        {howl.howl?.replyHowls.map((item) => (
          <HowlCard item={item} />
        ))}
      </section>
    </div>
  );
};

export default PostDetails;
