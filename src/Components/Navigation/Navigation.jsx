import React from "react";
import {navigation} from "./NavigationMenu";
import {useNavigate} from "react-router-dom";
import {Avatar, Button, IconButton, Menu, MenuItem} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../State/Auth/Action";

const image = {
  width: "50px",
  height: "50px",
};
const Navigation = () => {
  const {auth} = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

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
              onClick={() => (item.title === "Profile" ? navigate(`/profile/${5}`) : navigate(item.path))}
            >
              {item.icon}
              <p className="text-xl">{item.title}</p>
            </div>
          ))}
        </div>

        <div className="mt-3">
          <Button
            sx={{
              width: "90%",
              borderRadius: "29px",
              py: "15px",
              fontWeight: "bold",
              bgcolor: "#b91c1c",
              "&:hover": {
                backgroundColor: "black",
              },
            }}
            variant="contained"
          >
            HOWL
          </Button>
        </div>
      </div>
      <div className=" mt-5 mb-5">
        <div className="flex items-center justify-between space-x-3 hover:bg-gray-200 rounded-full p-3">
          <Avatar alt="Hamza Shaikh" src="/images/profile.jpeg" />
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
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
