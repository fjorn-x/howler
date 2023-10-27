import {navigation} from "./NavigationMenu";
import {useNavigate} from "react-router-dom";
import {Avatar, Box, Button, IconButton, Menu, MenuItem, Modal, TextField} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {useDispatch, useSelector} from "react-redux";
import {changePassword, logoutUser} from "../../State/Auth/AuthSlice";
import CloseIcon from "@mui/icons-material/Close";
import {useFormik} from "formik";
import * as Yup from "yup";
import React from "react";
import HowlFromNav from "./HowlFromNav";

const image = {
  width: "50px",
  height: "50px",
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  padding: "8px 0px",
  boder: "none",
  outline: "none",
  boxShadow: 24,
  borderRadius: "16px",
};

const Navigation = () => {
  const {auth} = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openChangePassword, setOpenChangePassword] = React.useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    handleClose();
  };

  const handleOpenChangePassword = () => {
    setOpenChangePassword(true);
  };
  const handleCloseChangePassword = () => {
    setOpenChangePassword(false);
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old Password is Required"),
    newPassword: Yup.string()
      .required("New Password is Required")
      .notOneOf([Yup.ref("oldPassword"), null], "New Password must be different from old password"),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(changePassword(values));
      handleCloseChangePassword();
    },
  });

  return (
    <div className=" flex flex-col justify-between h-screen sticky top-0">
      <div>
        <div className="pt-2 pb-5">
          <img src="/images/icon.png" alt="" style={image} />
        </div>
        <div className="space-y-2">
          {navigation.map((item) => (
            <div
              className="hover:bg-gray-200 cursor-pointer flex space-x-3 items-center rounded-full p-3 "
              onClick={() => (item.title === "Profile" ? navigate(`/profile/${auth?.user?.id}`) : navigate(item.path))}
            >
              {item.icon}
              <p className="text-xl">{item.title}</p>
            </div>
          ))}
        </div>

        <div className="mt-3">
          <HowlFromNav />
        </div>
      </div>
      <div className=" mt-5 mb-5">
        <div className="flex items-center justify-between space-x-3 hover:bg-gray-200 rounded-full p-3">
          <Avatar
            sx={{bgcolor: "#b91c1c"}}
            alt={auth.user.fullName}
            src={auth.user.profileImage === null ? "null" : auth.user.profileImage}
          />
          <div>
            <span>{auth.user?.fullName}</span>
            <p className="opacity-70">@{auth.user?.fullName.toLowerCase().replace(/\s/g, "_")}</p>
          </div>
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreHorizIcon size="small" />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            <MenuItem onClick={handleOpenChangePassword}>Change Password</MenuItem>
          </Menu>
        </div>
      </div>
      <Modal
        open={openChangePassword}
        onClose={handleCloseChangePassword}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton onClick={handleCloseChangePassword} aria-label="delete" size="small" sx={{marginLeft: "8px"}}>
            <CloseIcon />
          </IconButton>

          <form className="flex flex-col justify-center items-center py-5 " onSubmit={formik.handleSubmit}>
            <div className="w-[60%] space-y-6">
              <h1 className="text-2xl font-bold"> Change your Password </h1>

              <TextField
                fullWidth
                id="oldPassword"
                name="oldPassword"
                label="Old Password"
                value={formik.values.oldPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                helperText={formik.touched.oldPassword && formik.errors.oldPassword}
              />
              <TextField
                fullWidth
                id="newPassword"
                name="newPassword"
                label="New Password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                helperText={formik.touched.newPassword && formik.errors.newPassword}
              />
            </div>

            <div className="w-[60%] mt-20 ">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!formik.isValid || !formik.dirty}
                sx={{
                  fontWeight: "bold",
                  bgcolor: "#b91c1c",
                  "&:hover": {
                    backgroundColor: "black",
                  },
                }}
              >
                Change Password
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Navigation;
