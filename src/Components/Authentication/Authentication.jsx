import React, {useState} from "react";

import {GoogleLogin} from "@react-oauth/google";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import {useDispatch} from "react-redux";
import {registerUser} from "../../State/Auth/AuthSlice";
import {Box, Button, Grid, Divider, IconButton, InputAdornment, Modal, TextField} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import jwtDecode from "jwt-decode";

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

const Authentication = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      dateOfBirth: {
        day: "",
        month: "",
        year: "",
      },
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
      console.log("LoginValues : ", values);
    },
  });

  return (
    <div>
      <Grid className="overscroll-none" container>
        <Grid className="hidden lg:block" item lg={7}>
          <img
            className="w-full h-screen object-cover "
            src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGFlc3RldGljJTIwYWJzdHJhY3R8ZW58MHx8MHx8fDA%3D&w=500"
            alt=""
          />
          <div className="absolute top-[50%] left-[19%] text-white text-6xl font-extrabold">HOWLER</div>
        </Grid>
        <Grid className="px-10 py-28 space-y-20" item lg={5} xs={12}>
          <h1 className="text-5xl font-bold">Find Your Wolf Pack</h1>
          <h1 className="text-3xl font-bold ">Join Today.</h1>
          <div className="w-[60%]">
            <div className="w-full space-y-2 mb-20">
              <div className="flex justify-center items-center">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const {name, email} = jwtDecode(credentialResponse.credential);

                    formik.setFieldValue("fullName", name);
                    formik.setFieldValue("email", email);
                    console.log(name);
                    handleOpen();
                    console.log(email);

                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  size="large"
                  type="icon"
                  shape="pill"
                />
              </div>
              <Divider>or</Divider>
              <SignupModal />
              <p className="text-xs leading-none text-gray-500">
                By signing up, you agree to be Respectful towards other users, including Cookie Use.
              </p>
            </div>
            <div>
              <h1 className="font-bold text-xl mb-2">Already have an account?</h1>
              <LoginModal />
            </div>
          </div>
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <IconButton onClick={handleClose} aria-label="delete" size="small" sx={{marginLeft: "8px"}}>
            <CloseIcon />
          </IconButton>

          <form className="flex flex-col justify-center items-center py-5 " onSubmit={formik.handleSubmit}>
            <div className="w-[60%] space-y-6">
              <h1 className="text-2xl font-bold"> Enter Password to Create Account </h1>

              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.errors.password ? formik.errors.password : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
                Create Account
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Authentication;
