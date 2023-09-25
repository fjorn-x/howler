import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {useFormik} from "formik";
import {Avatar, IconButton, TextField} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

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
  const [, setUploading] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (values) => {
    console.log("edit profile modal", values);
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      website: "",
      location: "",
      bio: "",
      backgroundImage: "",
      image: "",
    },
    onSubmit: handleSubmit,
  });

  const handleImageChange = (event) => {
    setUploading(true);
    const {name} = event.target;
    const file = event.target.files[0];
    formik.setFieldValue(name, file);
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
                onSubmit={handleClose}
                sx={{borderRadius: "20px", bgcolor: "black", color: "white"}}
              >
                Save
              </Button>
            </div>
            <div className="overflow-y-auto overflow-x-hidden h-[80vh]">
              <>
                <div className="w-full">
                  <div className="relative">
                    <img
                      className="w-full h-[12rem] object-cover object-center mt-2"
                      src="https://images.unsplash.com/photo-1519060825752-c4832f2d400a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWVzdGhldGljfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                      alt=""
                    />
                    <input
                      type="file"
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleImageChange}
                      name="backgroundImage"
                    />
                  </div>
                </div>
                <div className=" w-full mt-5 h-[3rem] ml-3 transform -translate-y-20">
                  <div className="relative">
                    <Avatar
                      alt="username"
                      src="/images/profile.jpeg"
                      sx={{
                        width: "7rem",
                        height: "7rem",
                        border: `4px solid ${"white"}`,
                      }}
                    />
                    <input
                      type="file"
                      className="absolute top-0 left-0 w-[7rem] h-full opacity-0 cursor-pointer"
                      name="image"
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
                  {true ? (
                    <p className="text-lg ">Switch to professional</p>
                  ) : (
                    <p className="text-lg">Edit professional profile</p>
                  )}
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
