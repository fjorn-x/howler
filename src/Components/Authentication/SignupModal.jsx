import React from "react";
import {Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Modal, Select, TextField} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {registerUser} from "../../State/Auth/Action";

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

const currentYear = new Date().getFullYear();

const years = Array.from({length: 120}, (_, i) => currentYear - i);
const days = Array.from({length: 30}, (_, i) => i + 1);
const months = [
  {value: 1, label: "January"},
  {value: 2, label: "February"},
  {value: 3, label: "March"},
  {value: 4, label: "April"},
  {value: 5, label: "May"},
  {value: 6, label: "June"},
  {value: 7, label: "July"},
  {value: 8, label: "August"},
  {value: 9, label: "September"},
  {value: 10, label: "October"},
  {value: 11, label: "November"},
  {value: 12, label: "December"},
];

const SignupModal = () => {
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const dispatch = useDispatch();

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

  const handleDateChange = (name) => (event) => {
    formik.setFieldValue("dateOfBirth", {
      ...formik.values.dateOfBirth,
      [name]: event.target.value,
    });
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Full Name is Required")
      .matches(/^\w+\s\w+$/, "Please Enter Full Name"),
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string()
      .required("Password is Required")
      .min(8, "Pasword must be 8 or more characters")
      .matches(/(?=.*[a-z])\w+/, "Password should contain at least one lowercase")
      .matches(/(?=.*[A-Z])\w+/, "Password should contain at least one uppercase")
      .matches(/\d/, "Password should contain at least one number")
      .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
    dateOfBirth: Yup.object().shape({
      day: Yup.number().required(),
      month: Yup.string().required(),
      year: Yup.number().required(),
    }),
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
      // const {day, month, year} = values.dateOfBirth;
      // const dateOfBirth = `${year}-${month}-${day}`;
      // values.dateOfBirth = dateOfBirth;
      // const date=new Date().setFullYear(year,month,day);
      dispatch(registerUser(values));
      console.log("Signup values : ", values);
    },
  });

  return (
    <div>
      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={handleOpen}
        sx={{
          borderRadius: "30px",
          py: "7px",
          fontWeight: "bold",
          bgcolor: "#b91c1c",
          "&:hover": {
            backgroundColor: "black",
          },
        }}
      >
        Create Account
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <IconButton onClick={handleClose} aria-label="delete" size="small" sx={{marginLeft: "8px"}}>
            <CloseIcon />
          </IconButton>

          <form className="flex flex-col justify-center items-start py-5 px-20" onSubmit={formik.handleSubmit}>
            <div className="w-full space-y-6">
              <h1 className="text-2xl font-bold"> Create your account </h1>

              <TextField
                fullWidth
                id="fullName"
                name="fullName"
                label="Full Name"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
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

              <h1 className="font-semibold text-lg">Date of Birth</h1>
              <div className="flex items-center justify-start space-x-2">
                <FormControl sx={{minWidth: "20%"}}>
                  <InputLabel id="day">Day</InputLabel>
                  <Select
                    label="Day"
                    name="day"
                    value={formik.values.dateOfBirth.day}
                    onBlur={formik.handleBlur}
                    onChange={handleDateChange("day")}
                  >
                    {days.map((day) => (
                      <MenuItem key={day} value={day}>
                        {day}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{minWidth: "50%"}}>
                  <InputLabel>Month</InputLabel>
                  <Select
                    label="Month"
                    name="month"
                    value={formik.values.dateOfBirth.month}
                    onBlur={formik.handleBlur}
                    onChange={handleDateChange("month")}
                  >
                    {months.map((monthObj) => (
                      <MenuItem key={monthObj.label} value={monthObj.value}>
                        {monthObj.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{minWidth: "30%"}}>
                  <InputLabel>Year</InputLabel>
                  <Select
                    label="Year"
                    name="year"
                    value={formik.values.dateOfBirth.year}
                    onBlur={formik.handleBlur}
                    onChange={handleDateChange("year")}
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="w-full mt-20 ">
              <Button
                fullWidth
                type="submit"
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

export default SignupModal;
