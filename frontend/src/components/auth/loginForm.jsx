"use client";

import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Paper,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { FacebookRounded, Google } from "@mui/icons-material";
import Link from "next/link";
import { Linefont } from "next/font/google";
import { postData } from "@/helper/common";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await postData("/api/auth/login", { email, password });
    if (result.success === true) {
      toast.success("login successfully");
    } else {
      toast.error("Something is wrong");
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
        overflow: "hidden",
        alignItems: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.55)",
          zIndex: 1,
        },
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 5,
          width: "100%",
          maxWidth: 420,
          backdropFilter: "blur(12px)",
          background: "rgba(255, 255, 255, 0.15)",
          borderRadius: 4,
          zIndex: 2,
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        <Box textAlign="center" mb={2}>
          <Avatar
            sx={{ bgcolor: "#1976d2", mx: "auto", width: 56, height: 56 }}
          >
            <LockPersonIcon fontSize="medium" />
          </Avatar>
          <Typography
            variant="h5"
            fontWeight={600}
            mt={2}
            color="white"
            letterSpacing={0.5}
          >
            Login to FundNest
          </Typography>
          <Typography variant="body2" color="white" mt={1}>
            Empower your dreams with support 🚀
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            sx={{ input: { color: "white" }, label: { color: "white" } }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            sx={{ input: { color: "white" }, label: { color: "white" } }}
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ px: 6, py: 1.5, fontWeight: 600 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Log In"
              )}
            </Button>
          </Box>

          <Typography
            variant="body2"
            align="center"
            color="white"
            sx={{ mt: 1 }}
          >
            or
          </Typography>

          <Box display={"flex"} justifyContent={"center"} gap={2} mt={2}>
            <Button
              variant="contained"
              startIcon={<FacebookRounded />}
              onClick={() =>
                (window.location.href =
                  "http://localhost:3030/api/user/facebook")
              }
              sx={{
                backgroundColor: "#3b5998",
                color: "white",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#334d84",
                },
              }}
            >
              Facebook
            </Button>
            <Button
              variant="contained"
              startIcon={<Google />}
              onClick={() =>
                (window.location.href = "http://localhost:3030/api/user/google")
              }
              sx={{
                backgroundColor: "#db4437",
                color: "white",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#c33d2e",
                },
              }}
            >
              Google
            </Button>
          </Box>
          <hr />
          <Typography
            variant="body2"
            align="center"
            mt={3}
            color="white"
            sx={{ fontSize: "0.9rem" }}
          >
            Don't have an account?{" "}
            <Link
              // href="signup/"
              href="/auth/signup"
              style={{
                color: "#90caf9",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
