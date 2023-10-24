/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {Avatar, Button, TextField, styled} from "@mui/material";
import {useFormik} from "formik";
import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import ImageIcon from "@mui/icons-material/Image";
import {TextareaAutosize as BaseTextareaAutosize} from "@mui/base";

import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import HowlCard from "./HowlCard";
import {useDispatch, useSelector} from "react-redux";
import {getAllHowls} from "../../State/Howl/HowlSlice";

const NoBorderTextField = styled(TextField)({
  ".css-8ewcdo-MuiInputBase-root-MuiOutlinedInput-root": {
    padding: "0px 0px 16.5px 0px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    padding: "0px 14px",
    border: "none",
  },
  "& .Mui-focused": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: 0,
      borderBottom: "1px solid #6b7280",
    },
  },
});

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Woof text is required"),
});

const HomeFeed = () => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const dispatch = useDispatch();
  const {howl} = useSelector((store) => store);
  const handleSubmit = (values) => {
    console.log("values", values);
  };
  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });
  const handleSelectImage = (event) => {
    setUploadingImage(true);
    const imgUrl = event.target.files[0];
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(imgUrl);
    setUploadingImage(true);
  };

  useEffect(() => {
    dispatch(getAllHowls());
  }, [howl.like, howl.retweet]);

  return (
    <div className="border-x overscroll-none">
      <section className="pb-4 z-50 flex items-center sticky top-0 bg-opacity-95 bg-white">
        <h1 className="px-4 py-2 text-xl font-bold  opacity-90">Home</h1>
      </section>
      <section className="p-3 border-y">
        <div className="flex space-x-5">
          <Avatar alt="username" src="images/profile.jpeg" />
          <div className="w-full">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <NoBorderTextField
                  id="content"
                  name="content"
                  fullWidth
                  inputProps={{
                    style: {
                      padding: 0,
                    },
                  }}
                  placeholder="Woof Woof Woof"
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  multiline
                  minRows={1}
                  maxRows={5}
                />
              </div>

              <div className="flex justify-between items-center mt-5">
                <div className="flex space-x-5 items-center">
                  <label className="flex item-center space-x-2 cursor-pointer rouded-md">
                    <ImageIcon className="text-[#b91c1c]" />
                    <input type="file" name="imageFile" className="hidden" onChange={handleSelectImage} />
                  </label>
                  <FmdGoodIcon className="text-[#b91c1c]" />
                  <TagFacesIcon className="text-[#b91c1c]" />
                </div>

                <div>
                  <Button
                    sx={{
                      width: "100%",
                      borderRadius: "20px",

                      py: "8px",
                      px: "20px",
                      bgcolor: "#b91c1c",
                      "&:hover": {
                        backgroundColor: "black",
                      },
                    }}
                    variant="contained"
                    type="submit"
                    disabled={!formik.isValid || !formik.dirty}
                    className="hover:bg-black "
                  >
                    HOWL
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section>
        {howl.howls?.map((item) => (
          <>
            <HowlCard item={item} />
          </>
        ))}
      </section>
    </div>
  );
};

export default HomeFeed;
