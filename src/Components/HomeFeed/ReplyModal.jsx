import * as React from "react";
import Box from "@mui/material/Box";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

import Modal from "@mui/material/Modal";
import {Avatar, IconButton, Button} from "@mui/material";

import {Verified} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {useFormik} from "formik";
import * as Yup from "yup";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  border: "none",
  borderRadius: "16px",
  padding: "16px 8px",
  outline: "none",
};

const userDetails = {username: `@hamzashaikh`};
const validationSchema = Yup.object().shape({
  content: Yup.string().required("Woof text is required"),
});

export default function ReplyModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [, setUploadingImage] = React.useState(false);
  const [, setSelectedImage] = React.useState("");
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
    <div>
      <IconButton onClick={handleOpen}>
        <ChatBubbleOutlineOutlinedIcon className="cursor-pointer" fontSize="small" />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton onClick={handleClose} aria-label="delete" size="small">
            <CloseIcon />
          </IconButton>
          <div className="flex space-x-5 px-1 my-4 ">
            <Avatar className="" alt="username" src="/images/profile.jpeg" />
            <div className="w-full ">
              <div className="flex justify-between items-start">
                <div className="flex  space-x-1">
                  <span className="font-semibold hover:underline">Hamza Shaikh</span>
                  <Verified className="text-[#b91c1c]" />

                  <span className="text-gray-600 ">@hamzashaikh</span>
                  <span className="text-gray-600">&#183; 2m</span>
                </div>
              </div>
              <div>
                <p className="p-0 w-full">
                  AMD GPU+CPU GIVEAWAY!! @AMD created 500 Limited Edition @StarfieldGame Radeon™ RX
                  7900 XTX and Ryzen™ 7 7800X3D processor gift packs and partnered with me to give
                  one away! #GameOnAMD #AMDPartner How to enter: ✅Follow @Average_Jonas ✅Like &
                  repost ✅Tag 2 friends Winner will be announced Sept. 20!
                </p>
                <p className="mb-3">rb.gy/wvldh</p>
                <p className="mb-3">Replying to {userDetails.username}</p>
              </div>
            </div>
          </div>
          <div className="flex space-x-5 px-1 ">
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
        </Box>
      </Modal>
    </div>
  );
}
