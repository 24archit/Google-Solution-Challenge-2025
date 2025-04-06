import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // For redirection
import axios from "axios"; // For API calls

const Login = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);


  useEffect(() => {
    if (!window.recaptchaVerifier && recaptchaRef.current) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaRef.current, {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA solved", response);
        },
        'expired-callback': () => {
          console.warn("reCAPTCHA expired");
        }
      });
      window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
      });
    }
  }, [recaptchaRef]);

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const appVerifier = window.recaptchaVerifier;
      const formattedPhone = `+91${phone}`;
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // const handleVerifyOtp = async () => {
  //   try {
  //     setLoading(true);

  //     if (!confirmationResult) {
  //       alert("OTP has not been sent or session expired.");
  //       return;
  //     }

  //     // Trim any whitespace from OTP input
  //     const trimmedOtp = otp.trim();
  //     if (!trimmedOtp) {
  //       alert("Please enter the OTP.");
  //       return;
  //     }

  //     console.log("Attempting verification with OTP:", trimmedOtp);

  //     // Confirm the OTP using Firebase's confirmationResult
  //     const userCredential = await confirmationResult.confirm(trimmedOtp);
  //     const idToken = await userCredential.user.getIdToken();

  //     console.log("Verified user:", userCredential.user);

  //     // Send token to backend to create JWT
  //     const response = await axios.post("http://localhost:7000/api/auth/login", {
  //       idToken,
  //     });

  //     if (response.data.jwt) {
  //       localStorage.setItem("token", response.data.jwt);
  //       navigate("/");
  //     } else {
  //       alert("Server did not return a token.");
  //     }
  //   } catch (error) {
  //     console.error("OTP Verification Error:", error.code, error.message);
  //     // Check for Firebase invalid verification code error
  //     if (error.code === "auth/invalid-verification-code") {
  //       alert("The OTP you entered is invalid. Please double-check and try again.");
  //     } else {
  //       alert(error.message || "Invalid OTP or expired session.");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      if (confirmationResult) {
        const userCredential = await confirmationResult.confirm(otp);
        const idToken = await userCredential.user.getIdToken(); // Get Firebase ID token

        console.log(userCredential)

        // Send token to backend to create JWT
        const response = await axios.post("https://google-solution-challenge-2025-stwx.vercel.app/api/auth/login", {
          idToken,
        });

        if (response.data.jwt) {
          console.log(response.data.jwt)
          localStorage.setItem("token", response.data.jwt); // Store JWT
          navigate("/"); // Redirect to Home
        }
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission
      if (!otpSent) {
        handleSendOtp();
      } else {
        handleVerifyOtp();
      }
    }
  };


  return (
    <Container maxWidth="sm" sx={{ my: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            color: "#0b3d91",
            fontWeight: 500,
            mb: 3,
          }}
        >
          Government Authentication Portal
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Alert
          severity="info"
          sx={{ mb: 3, backgroundColor: "#f0f7ff", color: "#0b3d91" }}
        >
          Please enter your registered phone number to receive an OTP for authentication.
          <br />
          For demo, use <strong>1234567890</strong> as phone number and <strong>123456</strong> as OTP.
        </Alert>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="enter 10 digit phone number"
            onKeyDown={handleEnterKey}
            disabled={otpSent}
            InputProps={{ sx: { borderRadius: 1 } }}
          />

          <div id="sign-in-button" ref={recaptchaRef}></div>

          {!otpSent ? (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              onClick={handleSendOtp}
              sx={{
                mt: 2,
                py: 1.5,
                backgroundColor: "#0b3d91",
                "&:hover": { backgroundColor: "#072a64" },
                borderRadius: 1,
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Send OTP"}
            </Button>
          ) : (
            <>
              <TextField
                label="Enter OTP"
                variant="outlined"
                fullWidth
                margin="normal"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                onKeyDown={handleEnterKey}
                InputProps={{ sx: { borderRadius: 1 } }}
              />

              <Button
                variant="contained"
                color="secondary"
                fullWidth
                disabled={loading}
                onClick={handleVerifyOtp}
                sx={{
                  mt: 2,
                  py: 1.5,
                  backgroundColor: "#0b3d91",
                  "&:hover": { backgroundColor: "#072a64" },
                  borderRadius: 1,
                }}
              >
                {loading ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CircularProgress size={24} sx={{ color: "white", mr: 1 }} />
                    Verifying...
                  </Box>
                ) : (
                  "Verify OTP"
                )}
              </Button>
            </>
          )}
        </Box>

        <Box sx={{ mt: 4, pt: 2, borderTop: "1px solid #eaeaea", textAlign: "center" }}>
          <Typography variant="caption" color="text.secondary">
            This is a secure government portal. All information provided is encrypted and protected.
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
            © {new Date().getFullYear()} Government of India. All rights reserved.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
