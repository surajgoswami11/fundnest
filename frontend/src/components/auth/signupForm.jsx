"use client";

import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Paper,
  Avatar,
  Grid,
  Input,
} from "@mui/material";

import "./customcss.css";

import LockPersonIcon from "@mui/icons-material/LockPerson";
import { useState } from "react";
import {
  CountrySelect,
  StateSelect,
  CitySelect,
  PhonecodeSelect,
} from "react-country-state-city";
import PhoneInput from "react-phone-number-input";
import "react-country-state-city/dist/react-country-state-city.css";
import { postData, postFormData } from "@/helper/common";
import { toast } from "react-toastify";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const [country, setCountry] = useState();
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);

  const [contactNumber, setContactNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);
    formData.append("userName", userName);
    formData.append("country", country?.name || "");
    formData.append("state", state?.name || "");
    formData.append("city", city?.name || "");
    formData.append("contactNumber", contactNumber);

    const result = await postFormData(`/api/auth/signup`, formData);

    if (result.success === true) {
      toast.success("User register succesfully");
      setLoading(false);
      setEmail("");
      setPassword("");
      setUserName("");
      setCountry({ name: "" });
      setState({ name: "" });
      setCity({ name: "" });
      setContactNumber("");
    } else {
      toast.error(result.message || "Something is error");
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url("/crowdfund.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        },
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 5,
          width: "100%",
          maxWidth: 550,
          backdropFilter: "blur(12px)",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: 4,
          zIndex: 2,
          border: "1px solid rgba(255,255,255,0.2)",
          color: "white",
        }}
      >
        <Box textAlign="center" mb={2}>
          <Avatar
            sx={{ bgcolor: "#1976d2", mx: "auto", width: 60, height: 60 }}
          >
            <LockPersonIcon fontSize="large" />
          </Avatar>
          <Typography
            variant="h5"
            fontWeight={600}
            mt={2}
            color="white"
            letterSpacing={0.5}
          >
            Sign up to FundNest
          </Typography>
          <Typography variant="body2" color="white" mt={1}>
            Empower your dreams with support 🚀
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            label="Full Name"
            type="text"
            fullWidth
            variant="outlined"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            margin="dense"
            required
            InputProps={{
              sx: {
                color: "white",
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 2,
              },
            }}
            InputLabelProps={{ sx: { color: "white" } }}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="dense"
            required
            InputProps={{
              sx: {
                color: "white",
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 2,
              },
            }}
            InputLabelProps={{ sx: { color: "white" } }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="dense"
            required
            InputProps={{
              sx: {
                color: "white",
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 2,
              },
            }}
            InputLabelProps={{ sx: { color: "white" } }}
          />

          <Box>
            <PhoneInput
              id="whatsApp"
              className="phone__input_field student__input_field"
              placeholder="Enter phone number"
              value={mobile}
              onChange={setMobile}
              defaultCountry="IN"
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{
                px: 6,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign Up"
              )}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
