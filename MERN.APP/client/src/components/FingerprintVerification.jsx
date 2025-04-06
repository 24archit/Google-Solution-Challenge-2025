import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Alert,
  Input,
} from "@mui/material";
import axios from "axios";
function FingerprintVerification({ onNext }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleVerify = async () => {
    if (!selectedFile) {
      setError("Please upload a fingerprint image first.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("fingerprint", selectedFile);
    formData.append("voter_id", localStorage.getItem("epicNo"));

    try {
      const response = await axios.post(
        "https://avvs-flask.onrender.com/upload-fingerprint",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response.data.verified) {
        onNext(); // Proceed to the next step
      } else {
        setError("Fingerprint verification failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during verification.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{ p: 4, borderRadius: 2, backgroundColor: "#f9f9f9" }}
    >
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ color: "#0b3d91", fontWeight: 500 }}
      >
        Fingerprint Verification
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 3 }}>
        Please upload your fingerprint image to proceed.
      </Typography>
      <Alert
        severity="info"
        sx={{ mb: 3, backgroundColor: "#f0f7ff", color: "#0b3d91" }}
      >
        As this is a prototype, please upload a fingerprint image associated
        with the designated Voter ID from the dataset available in the
        repository.
        <br />
        🔒 In the actual application, biometric verification would be performed
        using the phone's fingerprint sensor.
        <br />
        📂{" "}
        <a
          href="https://github.com/your-username/your-repo-name/tree/main/dataset"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0b3d91", textDecoration: "underline" }}
        >
          View example fingerprint image from the dataset
        </a>
      </Alert>

      {/* File Input */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isLoading}
        />
      </Box>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Verify Button */}
      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleVerify}
          disabled={isLoading}
          sx={{
            py: 1.5,
            borderRadius: 1,
            backgroundColor: "#0b3d91",
            "&:hover": {
              backgroundColor: "#072a64",
            },
          }}
        >
          {isLoading ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CircularProgress size={24} sx={{ color: "white", mr: 1 }} />
              Verifying...
            </Box>
          ) : (
            "Verify Fingerprint"
          )}
        </Button>
      </Box>
    </Paper>
  );
}

export default FingerprintVerification;
