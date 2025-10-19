import React, { useState } from "react";
import { TextField, Button, CircularProgress, Typography, Grid, Box } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../api/axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //  Regex patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  /*
    Password Rules:
    - Minimum 8 characters
    - At least 1 uppercase letter
    - At least 1 lowercase letter
    - At least 1 number
    - At least 1 special character
  */

  const handleRegister = async (e) => {
    e.preventDefault();

    // Client-side validations
    if (!email || !password) {
      return toast.error("Please fill all fields");
    }
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address");
    }
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
      );
    }

    try {
      setLoading(true);
      const res = await API.post("/auth/register", { email, password });
      toast.success("Heads up! Registered successfully. Now you can login.");
      navigate("/login");
      setEmail("");
      setPassword("");
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/* Left side image */}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: "none", sm: "block" },
        }}
      />

      {/* Right side form */}
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Box}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
          p: { xs: 2, sm: 4 },
          height: "100vh",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Register
        </Typography>

        <form onSubmit={handleRegister} style={{ width: "100%" }}>
          <TextField
            variant="outlined"
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            helperText="At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>

          <Grid container>
            <Grid item xs>
              <Link to="/forgot-password" style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="text.secondary">
                  Forgot password?
                </Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="primary.main">
                  Already have an account? Login here
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
