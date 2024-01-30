import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import axios from "axios";
import {API_BASE_URL} from "../../config/api";
import {useSelector} from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 640,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "12px 0px",
  border: "none",
  borderRadius: "16px",
  outline: "none",
};

const features = [
  "Prioritized rankings in conversations and search",
  "See approximately twice as many posts between ads in your For You and Following timelines.",
  "Add bold and italic text in your posts",
  "Post longer videos and 1080p video uploads",
  "All the existing Premium features, including edit post, Bookmark Folders and early access to new features",
];

export default function SubscriptionModal() {
  const [open, setOpen] = React.useState(false);
  const [plan, setPlan] = React.useState("annually");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const item = useSelector((store) => store.auth);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      return;
    }

    const order = await axios.get(`http://13.232.96.74:8080/api/razorpay/create/order/${plan === "annually" ? 1000 : 100}`);

    const options = {
      key: "rzp_test_C6MyjQb5ed2Jvz",
      amount: plan === "annually" ? 1000 : 100,
      currency: "INR",
      name: "Howler",
      description: "Howler Pro",
      order_id: order.id,
      handler: function (response) {
      },
      prefill: {
        name: item?.user.fullName,
        email: item?.user.fullName,
      },
      theme: {
        color: "#b91c1c",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{
          padding: "10px",
          paddingX: "20px",
          borderRadius: "25px",
          bgcolor: "#b91c1c",
          "&:hover": {
            backgroundColor: "black",
          },
        }}
      >
        Subscribe
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <IconButton onClick={handleClose} aria-label="delete" size="small" sx={{marginBottom: "16px", marginLeft: "8px"}}>
            <CloseIcon />
          </IconButton>
          <div className="bg-gradient-to-b from-red-700 to-white">
            <div className="flex justify-center pt-6 pb-3">
              <div className="w-[70%] space-y-5 ">
                <div className="p-4 rounded-xl flex items-center justify-between shadow-lg bg-white">
                  <h1 className="text-xl pr-5">
                    Premium subscribers with a verified phone number will get a blue checkmark once approved.
                  </h1>
                  <img className="w-24 h-24" src="/images/red-verified-badge.png" alt="" />
                </div>
                <div className="flex justify-between items-center border rounded-full  border-gray-500 bg-slate-300">
                  <div
                    onClick={() => setPlan("annually")}
                    className={`${plan === "annually" ? "border-r-2 rounded-full bg-white" : ""} cursor-pointer  px-10 py-2`}
                  >
                    <span className={`${plan === "annually" ? "text-black" : "text-slate-600"} `}>Annually</span>
                    <span className="text-green-500 text-sm ml-5">Save 12%</span>
                  </div>
                  <p
                    onClick={() => setPlan("monthly")}
                    className={`${
                      plan === "monthly" ? "text-black border-l-2 rounded-full bg-white" : "text-slate-600"
                    } cursor-pointer pr-20 pl-20 py-2`}
                  >
                    Monthly
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-gray-200 space-y-5">
                  <div className="flex justify-between items-center">
                    <h1 className="font-bold text-sm">Premium</h1>
                    <CheckCircleIcon fontSize="small" color="error" />
                  </div>

                  <div className="space-y-3">
                    {features.map((item) => (
                      <div className="space-x-2 flex items-center">
                        <FiberManualRecordIcon sx={{width: "7px", height: "7px"}} className="text-gray-500" />
                        <p className="text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center border-t-2 border-gray-300 py-3">
            <div className="w-[70%] space-y-3">
              <Button
                variant="contained"
                fullWidth
                className="flex justify-center items-center"
                sx={{
                  borderRadius: "30px",
                  backgroundColor: "black",
                  "&:hover": {
                    backgroundColor: "black",
                    opacity: "80%",
                  },
                }}
                onClick={handlePayment}
              >
                <span className="italic line-through"> &#8377;{plan === "monthly" ? "650" : "6800"}</span>
                <span className="italic px-2"> &#8377;{plan === "monthly" ? "1" : "10"}/year</span>
              </Button>

              <p className="text-xs leading-none text-gray-500">
                By subscribing, you agree to our 'Top-Secret Ninja Handshake of Becoming Verified.' Subscriptions auto-renew until you shout
                'Bankruptcyyy!' Cancel anytime, though we might shed a single tear. A verified phone number is not required.
              </p>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
