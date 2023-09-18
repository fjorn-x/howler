import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {useNavigate} from "react-router-dom";
import HowlCard from "../HomeFeed/HowlCard";
import {Divider} from "@mui/material";

const PostDetails = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  return (
    <div className="border-x-2">
      <section className="z-50 flex items-center sticky top-0 bg-opacity-95 bg-white pb-4 pt-2">
        <KeyboardBackspaceIcon className="cursor-pointer" onClick={handleBack} />
        <div className="ml-6 opacity-90 ">
          <h1 className="text-xl font-bold">Post</h1>
        </div>
      </section>
      <section>
        <HowlCard />
        <Divider />
      </section>
      <section>
        {[1, 1, 1, 1].map((item) => (
          <HowlCard />
        ))}
      </section>
    </div>
  );
};

export default PostDetails;
