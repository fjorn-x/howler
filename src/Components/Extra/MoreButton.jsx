import {IconButton, Menu, MenuItem} from "@mui/material";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {useDispatch, useSelector} from "react-redux";
import {deleteHowl} from "../../State/Howl/HowlSlice";

const MoreButton = ({item}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    dispatch(deleteHowl(item.id));
    handleClose();
  };
  return (
    <div>
      {" "}
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{marginTop: "-5px"}}
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
        {item?.user.id === auth?.user.id ? (
          <MenuItem onClick={handleDelete}>Delete Tweet</MenuItem>
        ) : (
          <MenuItem onClick={handleDelete}>Not Interested</MenuItem>
        )}
        {item?.user.id !== auth?.user.id && <MenuItem onClick={handleDelete}>Harmful or Spam</MenuItem>}
      </Menu>
    </div>
  );
};

export default MoreButton;
