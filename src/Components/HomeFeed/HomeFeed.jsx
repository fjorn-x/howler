/* eslint-disable no-unused-vars */
import {Avatar, Button} from "@mui/material";
import {useFormik} from "formik";
import React, {useState} from "react";
import * as Yup from "yup";
import ImageIcon from "@mui/icons-material/Image";
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
                <input
                  type="text"
                  name="content"
                  placeholder="Woof Woof Woof"
                  className="border-none outline-none text-xl bg-transparent w-full"
                  {...formik.getFieldProps("content")}
                  {...(formik.errors.content && formik.touched.content && (
                    <span className="text-red-500">{formik.errors.content}</span>
                  ))}
                />
              </div>
              {/* <div>
                  <img src="" alt="" />
              </div> */}
              <div className="flex justify-between items-center mt-5">
                <div className="flex space-x-5 items-center">
                  <label className="flex item-center space-x-2 cursor-pointer rouded-md">
                    <ImageIcon className="text-[#b91c1c]" />
                    <input
                      type="file"
                      name="imageFile"
                      className="hidden"
                      onChange={handleSelectImage}
                    />
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
                    }}
                    variant="contained"
                    type="submit"
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
