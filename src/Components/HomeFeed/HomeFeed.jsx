/* eslint-disable no-unused-vars */
import {Avatar, Button, TextField, styled} from "@mui/material";
import {useFormik} from "formik";
import React, {useState} from "react";
import * as Yup from "yup";
import ImageIcon from "@mui/icons-material/Image";
import {TextareaAutosize as BaseTextareaAutosize} from "@mui/base";

import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import HowlCard from "./HowlCard";

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Woof text is required"),
});

const HomeFeed = () => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
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

  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#f6f8fa",
    100: "#eaeef2",
    200: "#d0d7de",
    300: "#afb8c1",
    400: "#8c959f",
    500: "#6e7781",
    600: "#57606a",
    700: "#424a53",
    800: "#32383f",
    900: "#24292f",
  };

  const Textarea = styled(BaseTextareaAutosize)(
    ({theme}) => `

    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      border-bottom: 1px solid  ${blue[400]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

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
                <Textarea
                  className="w-full resize-none text-base pb-5"
                  aria-label="minimum height"
                  minRows={1}
                  maxRows={5}
                  placeholder="Woof Woof Woof"
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
        {[1, 1, 1, 1, 1].map((item) => (
          <>
            <HowlCard />
          </>
        ))}
      </section>
    </div>
  );
};

export default HomeFeed;
