import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Grid,
  Alert,
  Divider,
} from "@mui/material";
import UserInfo from "../components/UserInfo";
import FingerprintVerification from "../components/FingerprintVerification";
import NearestPollingBooth from "../components/NearestPollingBooth";
import QRCodeGenerator from "../components/QRCodeGenerator";
import AdditionalDetailsForm from "../components/AdditionalDetailsForm";

function VerificationPage() {
  const [epicNumber, setEpicNumber] = useState("");
  const [voterIdPhoto, setVoterIdPhoto] = useState(null);
  const [photoVerified, setPhotoVerified] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userFound, setUserFound] = useState(null);
  const [step, setStep] = useState(1);

  const userFoundSteps = [
    "Verification",
    "Confirm Identity",
    "Biometric Verification",
    "Digital Pass",
  ];
  const userNotFoundSteps = [
    "Verification",
    "Additional Information",
    "Polling Station",
    "Digital Pass",
  ];
  const initialSteps = ["Verification", "...", "...", "..."];

  const getStepLabels = () => {
    if (userFound === true) return userFoundSteps;
    if (userFound === false) return userNotFoundSteps;
    return initialSteps;
  };

  const verifyEpicNumber = async (epicNumber) => {
    const response = await fetch(
      "https://avvs-flask.onrender.com/enter-voter-id",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voter_id: epicNumber }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to verify EPIC number");
    }
    return response.json();
  };

  const verifyVoterIdPhoto = async (voterIdPhoto) => {
    const formData = new FormData();
    formData.append("voter_card", voterIdPhoto);

    const response = await fetch("https://avvs-flask.onrender.com/", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to verify Voter ID photo");
    }

    return response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!photoVerified) {
        // First stage: verify photo
        const photoResult = await verifyVoterIdPhoto(voterIdPhoto);
        if (photoResult.success) {
          setPhotoVerified(true);
        } else {
          alert(
            "Photo verification failed. Please upload a valid Voter ID photo."
          );
        }
      } else {
        // Second stage: verify EPIC
        const epicResult = await verifyEpicNumber(epicNumber);
        if (epicResult.verified) {
          setUserFound(true);
          setUserInfo(epicResult.details);
          localStorage.setItem("epicNo", epicResult.details["Voter ID"]);
          setStep(2);
        } else {
          setUserFound(false);
          setStep(2);
        }
      }
    } catch (error) {
      console.error("Verification failed:", error);
      alert("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFingerprintVerification = () => {
    setTimeout(() => setStep(3), 2000);
  };

  const handleAdditionalDetailsSubmit = () => {
    setTimeout(() => setStep(3), 2000);
  };

  const handlePhysicalVerification = () => {
    setTimeout(() => setStep(4), 2000);
  };

  const renderStepContent = () => {
    if (userFound === true) {
      switch (step) {
        case 2:
          return (
            <UserInfo
              userInfo={userInfo}
              onNext={handleFingerprintVerification}
            />
          );
        case 3:
          return <FingerprintVerification onNext={() => setStep(4)} />;
        case 4:
          return <QRCodeGenerator epicNumber={epicNumber} />;
        default:
          return null;
      }
    } else if (userFound === false) {
      switch (step) {
        case 2:
          return (
            <AdditionalDetailsForm onSubmit={handleAdditionalDetailsSubmit} />
          );
        case 3:
          return <NearestPollingBooth onNext={handlePhysicalVerification} />;
        case 4:
          return <QRCodeGenerator epicNumber={epicNumber} />;
        default:
          return null;
      }
    }
    return null;
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#0b3d91", fontWeight: 500, mb: 3 }}
        >
          Voter Verification Portal
        </Typography>

        <Box key={`stepper-${userFound}`}>
          <Stepper
            activeStep={step - 1}
            alternativeLabel
            sx={{
              mb: 4,
              "& .MuiStepLabel-root .Mui-completed": { color: "#0b3d91" },
              "& .MuiStepLabel-root .Mui-active": { color: "#0b3d91" },
            }}
          >
            {getStepLabels().map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {step === 1 && (
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Alert
              severity="info"
              sx={{ mb: 3, backgroundColor: "#f0f7ff", color: "#0b3d91" }}
            >
              {!photoVerified
                ? "Please upload your Voter ID photo to begin verification."
                : "Photo verified! Now, enter your EPIC number."}
            </Alert>
            <Alert
              severity="info"
              sx={{ mb: 3, backgroundColor: "#f0f7ff", color: "#0b3d91" }}
            >
              As this is a prototype, please upload a photo from the dataset
              available in the repository.
     
             
              <br />
              📂{" "}
              <a
                href="https://github.com/your-username/your-repo-name/tree/main/dataset"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0b3d91", textDecoration: "underline" }}
              >
                View example photo from the dataset
              </a>
            </Alert>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderStyle: "dashed",
                    borderWidth: "2px",
                    color: "#0b3d91",
                    borderColor: "#0b3d91",
                    backgroundColor: voterIdPhoto
                      ? "rgba(11, 61, 145, 0.05)"
                      : "transparent",
                  }}
                  disabled={photoVerified}
                >
                  {voterIdPhoto
                    ? photoVerified
                      ? "Photo Verified"
                      : "Change Voter ID Photo"
                    : "Upload Voter ID Photo"}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => setVoterIdPhoto(e.target.files[0])}
                    required={!photoVerified}
                  />
                </Button>
              </Grid>

              {voterIdPhoto && (
                <Grid item xs={12}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderRadius: 1,
                      borderColor: "#e0e0e0",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, color: "#555" }}
                    >
                      Uploaded Document:
                    </Typography>
                    <Box sx={{ textAlign: "center" }}>
                      <img
                        src={URL.createObjectURL(voterIdPhoto)}
                        alt="Voter ID"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "200px",
                          borderRadius: "4px",
                          border: "1px solid #e0e0e0",
                        }}
                      />
                    </Box>
                  </Paper>
                </Grid>
              )}

              {photoVerified && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Enter EPIC Number"
                    value={epicNumber}
                    onChange={(e) => setEpicNumber(e.target.value)}
                    required
                    variant="outlined"
                    placeholder="e.g., ABC1234567"
                    helperText="See your Voter Id for the EPIC number"
                    InputProps={{ sx: { borderRadius: 1 } }}
                  />
                </Grid>
              )}

              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={
                    isLoading || !voterIdPhoto || (photoVerified && !epicNumber)
                  }
                  fullWidth
                  size="large"
                  sx={{
                    py: 1.5,
                    backgroundColor: "#0b3d91",
                    "&:hover": { backgroundColor: "#072a64" },
                    borderRadius: 1,
                  }}
                >
                  {isLoading ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CircularProgress
                        size={24}
                        sx={{ color: "white", mr: 1 }}
                      />
                      Verifying...
                    </Box>
                  ) : !photoVerified ? (
                    "Verify Voter ID Photo"
                  ) : (
                    "Verify EPIC Number"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {step > 1 && renderStepContent()}

        <Box sx={{ mt: 4, pt: 2, borderTop: "1px solid #eaeaea" }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", textAlign: "center" }}
          >
            This is a secure government portal. All information provided is
            encrypted and protected.
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", textAlign: "center", mt: 0.5 }}
          >
            &copy; 2024 Electoral Commission
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default VerificationPage;
