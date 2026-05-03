import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

function ExamSnackbar({ snackbar, onClose }) {
  const isWarning = snackbar.severity === "warning";
  const color = isWarning ? "#f59e0b" : "#16a34a";
  const Icon = isWarning ? WarningAmberRoundedIcon : CheckCircleRoundedIcon;

  return (
    <Dialog
      open={snackbar.open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "min(92vw, 460px)",
          borderRadius: 3,
          boxShadow: "0 24px 80px rgba(15, 23, 42, 0.24)",
        },
      }}
    >
      <DialogContent sx={{ px: { xs: 3, sm: 5 }, py: { xs: 4, sm: 5 }, textAlign: "center" }}>
        <Box
          sx={{
            width: 82,
            height: 82,
            mx: "auto",
            mb: 2.5,
            borderRadius: "50%",
            bgcolor: isWarning ? "#fffbeb" : "#dcfce7",
            color,
            display: "grid",
            placeItems: "center",
          }}
        >
          <Icon sx={{ fontSize: 52 }} />
        </Box>

        <Typography sx={{ color: "#111827", fontSize: { xs: 24, sm: 28 }, fontWeight: 900, lineHeight: 1.25 }}>
          {snackbar.message}
        </Typography>

        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            mt: 3.5,
            minWidth: 130,
            minHeight: 46,
            bgcolor: color,
            borderRadius: 1.5,
            fontSize: 16,
            fontWeight: 800,
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              bgcolor: color,
              boxShadow: "none",
              filter: "brightness(0.94)",
            },
          }}
        >
          Đóng
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default ExamSnackbar;
