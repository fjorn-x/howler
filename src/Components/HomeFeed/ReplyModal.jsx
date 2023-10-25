import * as React from "react";
import Box from "@mui/material/Box";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

import Modal from "@mui/material/Modal";
import {Avatar, IconButton, Button, styled, TextField, CircularProgress} from "@mui/material";

import {Verified} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {useFormik} from "formik";
import * as Yup from "yup";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import {useDispatch, useSelector} from "react-redux";
import {replyHowl} from "../../State/Howl/HowlSlice";
import {uploadToCloudinary} from "../../Utils/uploadToCloudinary";

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
  howlId: Yup.number().required(),
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
export default function ReplyModal({item}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [uploadingImage, setUploadingImage] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState("");
  const dispatch = useDispatch();
  const {auth} = useSelector((store) => store);
  const handleSubmit = (values, actions) => {
    dispatch(replyHowl(values));

    setSelectedImage(null);
    actions.resetForm();
    handleClose();
  };
  const formik = useFormik({
    initialValues: {
      howlId: item?.id,
      content: "",
      image: "",
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
  return (
    <div>
      <IconButton onClick={handleOpen}>
        <ChatBubbleOutlineOutlinedIcon className="cursor-pointer" fontSize="small" />
      </IconButton>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <IconButton onClick={handleClose} aria-label="delete" size="small">
            <CloseIcon />
          </IconButton>
          <div className="flex space-x-5 px-1 my-4 ">
            <Avatar
              className=""
              sx={{bgcolor: "#b91c1c"}}
              alt={item?.user.fullName}
              src={item?.user.profileImage === null ? "null" : item?.user.profileImage}
            />
            <div className="w-full ">
              <div className="flex justify-between items-start">
                <div className="flex  space-x-1">
                  <span className="font-semibold hover:underline">{item?.user?.fullName}</span>
                  <Verified className="text-[#b91c1c]" />

                  <span className="text-gray-600 ">{item?.user?.fullName.toLowerCase().trim().replace(/\s/g, "_")}</span>
                  <span className="text-gray-600">&#183; 2m</span>
                </div>
              </div>
              <div>
                <p className="p-0 w-full">{item?.content}</p>
                {item?.image && (
                  <a href={item?.image} target="_blank" rel="noreferrer" className="mb-3 w-full text-blue-500">
                    image
                  </a>
                )}
                <p className="mb-3 mt-5 text-gray-400">Replying to {item?.user?.fullName}</p>
              </div>
            </div>
          </div>
          <div className="flex space-x-5 px-1 ">
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
                {uploadingImage ? (
                  <CircularProgress color="secondary" />
                ) : (
                  selectedImage && <img src={selectedImage} alt="" className="mt-[14px] w-full border border-gray-400 p-5 rounded-md" />
                )}

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
