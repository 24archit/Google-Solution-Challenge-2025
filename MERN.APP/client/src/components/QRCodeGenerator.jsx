import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Paper, CircularProgress } from "@mui/material";
import QRCode from "qrcode"; // Ensure you have installed: npm install qrcode
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert"; // Import Alert component
import { useTheme } from "@mui/material/styles"; // Import useTheme for theme access
const QRCodeGenerator = () => {
  const navigate = useNavigate();
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    const epicNo = localStorage.getItem("epicNo"); // Retrieve voter ID

    if (epicNo) {
      QRCode.toDataURL(`Voter ID: ${epicNo}`) // Convert to Base64 image
        .then((url) => {
          setQrCode(url);
          localStorage.setItem("qrCodeData", url); // Store Base64 QR code
        })
        .catch((err) => console.error("QR Code generation failed:", err));
    }
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "voter_qr_code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          textAlign: "center",
          maxWidth: 420,
          borderRadius: 3,
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#1976D2", mb: 2 }}>
  Download your QR code and save it securely. This QR code will be used to verify your identity during the voting process.  
  <br />
  On voting day, you can skip long queues and complete the process quickly.
</Typography>
<Alert 
  severity="success" 
  sx={{ mb: 3, backgroundColor: "#e8f5e9", color: "#2e7d32" }}
>
  ✅ On voting day, once your QR code is scanned, your identity details will be displayed to the admin for verification.  
  If matched successfully, you’ll be allowed to proceed and cast your vote without delay.
  <br />
  🔗{" "}
  <a
    href="/admin"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: "#2e7d32", textDecoration: "underline" }}
  >
    View Admin Verification Page
  </a>
</Alert>


        {qrCode ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#fff",
                borderRadius: 2,
                boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
                p: 2,
                mb: 3,
              }}
            >
              <img src={qrCode} alt="QR Code" style={{ width: 220, height: 220 }} />
            </Box>

            {/* Buttons aligned properly */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDownload}
                sx={{ fontWeight: 500, textTransform: "none", py: 1 }}
              >
                Download QR Code
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/dashboard")}
                sx={{ fontWeight: 500, textTransform: "none", py: 1 }}
              >
                Go to Dashboard
              </Button>
            </Box>
          </>
        ) : (
          <CircularProgress size={50} sx={{ color: "#1976D2", mt: 3 }} />
        )}
      </Paper>
    </Box>
  );
};

export default QRCodeGenerator;
