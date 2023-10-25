/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {Avatar, Button, CircularProgress, TextField, styled} from "@mui/material";
import {useFormik} from "formik";
import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import ImageIcon from "@mui/icons-material/Image";

import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import HowlCard from "./HowlCard";
import {useDispatch, useSelector} from "react-redux";
import {createHowl, getAllHowls, getAllReplyHowls} from "../../State/Howl/HowlSlice";
import {uploadToCloudinary} from "../../Utils/uploadToCloudinary";

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
      borderBottom: "1px solid #b91c1c",
    },
  },
});

const validationSchema = Yup.object().shape({
  content: Yup.string(),
  image: Yup.string(),
});

validationSchema.test("atLeastOneField", null, function (values) {
  const {content, image} = values;

  if (!content && !image) {
    return this.createError({
      path: "content",
      message: "At least one of content or image must be populated.",
    });
  }
  return true;
});

const HomeFeed = () => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const dispatch = useDispatch();
  const {howl, auth} = useSelector((store) => store);
  const handleSubmit = (values, actions) => {
    dispatch(createHowl(values));
    setSelectedImage(null);
    actions.resetForm();
  };
  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      isHowl: true,
    },
    onSubmit: handleSubmit,
    validationSchema,
  });
  const handleSelectImage = async (event) => {
    setUploadingImage(true);
    const imgUrl = await uploadToCloudinary(event.target.files[0]);
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(imgUrl);
    setUploadingImage(false);
  };

  useEffect(() => {
    dispatch(getAllHowls());
    dispatch(getAllReplyHowls());
  }, [howl.like, howl.retweet, howl.howl]);

  return (
    <div className="border-x overscroll-none">
      <section className="pb-4 z-50 flex items-center sticky top-0 bg-opacity-95 bg-white">
        <h1 className="px-4 py-2 text-xl font-bold  opacity-90">Home</h1>
      </section>
      <section className="p-3 border-y">
        <div className="flex space-x-5">
          <Avatar
            sx={{bgcolor: "#b91c1c"}}
            alt={auth.user.fullName}
            src={auth.user.profileImage === null ? "null" : auth.user.profileImage}
          />
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
              <div>
                {uploadingImage ? (
                  <CircularProgress color="secondary" />
                ) : (
                  selectedImage && <img src={selectedImage} alt="" className="mt-[14px] w-full border border-gray-400 p-5 rounded-md" />
                )}
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
        {howl?.howls
          // ?.filter(
          //   (item) => item?.user?.id === auth.user?.id || item?.user?.followers?.filter((fol) => fol.id === auth.user.id).length === 1
          // )
          .map((item) => (
            <HowlCard item={item} />
          ))}
      </section>
    </div>
  );
};

export default HomeFeed;
