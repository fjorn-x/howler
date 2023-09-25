import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "16px 0px",
  border: "none",
  borderRadius: "16px",
  outline: "none",
};

export default function SubscriptionModal() {
  const [open, setOpen] = React.useState(false);
  const [plan, setPlan] = React.useState("annually");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" sx={{padding: "10px", paddingX: "20px", borderRadius: "25px", bgcolor: "#b91c1c"}}>
        Subscribe
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <IconButton onClick={handleClose} aria-label="delete" size="small" sx={{marginBottom: "16px", marginLeft: "8px"}}>
            <CloseIcon />
          </IconButton>

          <div className="flex justify-center pt-6 pb-3">
            <div className="w-[70%] space-y-5 ">
              <div className="p-5 rounded-md flex items-center justify-between shadow-lg bg-white">
                <h1 className="text-xl pr-5">Premium subscribers with a verified phone number will get a blue checkmark once approved.</h1>
                <img
                  className="w-24 h-24"
                  src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
                  alt=""
                />
              </div>
              <div className="flex justify-between items-center border rounded-full px-10 py-2 border-gray-500">
                <div className="px-5 ">
                  <span
                    onClick={() => setPlan("annually")}
                    className={`${plan === "annually" ? "text-black" : "text-gray-400"} cursor-pointer`}
                  >
                    Annually
                  </span>
                  <span className="text-green-500 text-sm ml-5">Save 12%</span>
                </div>
                <p
                  onClick={() => setPlan("monthly")}
                  className={`${plan === "monthly" ? "text-black" : "text-gray-400"} cursor-pointer px-10`}
                >
                  Monthly
                </p>
              </div>
              <div className="space-y-3">
                <div className="p-5 rounded-md bg-white border border-gray-500">
                  <h1 className="font-bold text-sm">Premium</h1>

                  <div className="space-x-5">
                    <FiberManualRecordIcon sx={{width: "7px", height: "7px"}} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
