/* eslint-disable jsx-a11y/img-redundant-alt */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {useFormik} from "formik";
import {Avatar, CircularProgress, IconButton, TextField} from "@mui/material";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../../State/Auth/AuthSlice";
import {uploadToCloudinary} from "../../Utils/uploadToCloudinary";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "16px",
  boxShadow: 24,
  padding: "4px 2px",
  outline: "none",
};

export default function ProfileModal() {
  const [open, setOpen] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [uploadingBanner, setUploadingBanner] = React.useState(false);

  const [selectedImage, setSelectedImage] = React.useState("");
  const [selectedBanner, setSelectedBanner] = React.useState("");

  const {auth} = useSelector((store) => store);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(updateUser(values));
    setSelectedImage("");
    setSelectedBanner("");
    setOpen(false);
  };

  const validationSchema = Yup.object().shape({
    website: Yup.string().matches(/^(https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z]{2,})+(\/[a-zA-Z0-9]+)*$/, "Enter a valid website"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: auth?.user.fullName,
      website: auth?.user.website,
      location: auth?.user.location,
      bio: auth?.user.bio,
      bannerImage: auth?.user.bannerImage,
      profileImage: auth?.user.profileImage,
      profession: auth?.user.profession,
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const handleImageChange = async (event) => {
    if (event.target.name === "profileImage") {
      setUploading(true);
      const file = await uploadToCloudinary(event.target.files[0]);
      const {name} = event.target;
      formik.setFieldValue(name, file);
      setSelectedImage(file);
      setUploading(false);
    } else {
      setUploadingBanner(true);
      const file = await uploadToCloudinary(event.target.files[0]);
      const {name} = event.target;
      formik.setFieldValue(name, file);
      setSelectedBanner(file);
      setUploadingBanner(false);
    }
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="outlined"
        sx={{
          borderRadius: "20px",
          textTransform: "none",
          border: "1px solid gray",
          fontWeight: "bold",
          color: "black",
          "&:hover": {
            backgroundColor: "#f3f4f6",
            borderBlockColor: "black",
          },
        }}
        className="mr-2 "
      >
        Edit Profile
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between px-3 py-1">
              <div className="space-x-3 z-50 flex items-center sticky top-0 bg-opacity-95 bg-white ">
                <IconButton onClick={handleClose} aria-label="delete" size="small">
                  <CloseIcon />
                </IconButton>
                <h1 className="text-xl font-bold pl-2">Edit Profile</h1>
              </div>
              <Button
                type="submit"
                variant="contained"
                onSubmit={handleSubmit}
                sx={{borderRadius: "20px", bgcolor: "black", color: "white"}}
              >
                Save
              </Button>
            </div>
            <div className="overflow-y-auto overflow-x-hidden h-[80vh]">
              <>
                <div className="w-full">
                  <div className="relative">
                    {uploadingBanner ? (
                      <div className="flex justify-center-items-center w-full h-[12rem] flex-grow">
                        <CircularProgress color="secondary" />
                      </div>
                    ) : (
                      <img
                        className="w-full h-[12rem] object-cover object-center mt-2"
                        src={
                          selectedBanner ||
                          auth.user.bannerImage ||
                          "https://images.unsplash.com/photo-1461696114087-397271a7aedc?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWVzdGhldGljfGVufDB8fDB8fHww"
                        }
                        alt="Banner Image"
                      />
                    )}
                    <input
                      type="file"
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleImageChange}
                      name="bannerImage"
                    />
                  </div>
                </div>
                <div className=" w-full mt-5 h-[3rem] ml-3 transform -translate-y-20">
                  <div className="relative">
                    {uploading ? (
                      <CircularProgress color="secondary" />
                    ) : (
                      <Avatar
                        alt={auth.user.fullName}
                        src={selectedImage || auth.user.profileImage}
                        sx={{
                          width: "7rem",
                          height: "7rem",
                          border: `4px solid ${"white"}`,
                          bgcolor: "#b91c1c",
                        }}
                      />
                    )}
                    <input
                      type="file"
                      className="absolute top-0 left-0 w-[7rem] h-full opacity-0 cursor-pointer"
                      name="profileImage"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              </>

              <div className="space-y-6 px-3">
                <TextField
                  fullWidth
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />
                <TextField
                  placeholder="Introduce Yourself"
                  multiline
                  rows={2}
                  fullWidth
                  id="bio"
                  name="bio"
                  label="Bio"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  error={formik.touched.bio && Boolean(formik.errors.bio)}
                  helperText={formik.touched.bio && formik.errors.bio}
                />
                <TextField
                  fullWidth
                  id="profession"
                  name="profession"
                  label="Profession"
                  placeholder="Developer"
                  value={formik.values.profession}
                  onChange={formik.handleChange}
                  error={formik.touched.profession && Boolean(formik.errors.profession)}
                  helperText={formik.touched.profession && formik.errors.profession}
                />
                <TextField
                  fullWidth
                  placeholder="Mumbai, India"
                  id="location"
                  name="location"
                  label="Location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  error={formik.touched.location && Boolean(formik.errors.location)}
                  helperText={formik.touched.location && formik.errors.location}
                />
                <TextField
                  fullWidth
                  id="website"
                  name="website"
                  label="Website"
                  placeholder="www.dunder-mifflin.com"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  error={formik.touched.website && Boolean(formik.errors.website)}
                  helperText={formik.touched.website && formik.errors.website}
                />

                <div className="!mt-8 ">
                  <p className="text-sm text-gray-500">Birth Date &#183; Edit</p>
                  <p className="text-xl">10 November &#183; 2000</p>
                </div>
                <div className="flex items-center justify-between w-full !mb-8 cursor-pointer hover:bg-slate-100">
                  {true ? <p className="text-lg ">Switch to professional</p> : <p className="text-lg">Edit professional profile</p>}
                  <ChevronRightIcon />
                </div>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
