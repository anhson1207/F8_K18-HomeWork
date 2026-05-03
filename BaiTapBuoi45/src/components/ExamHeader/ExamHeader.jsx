import { Box, Button, Chip, Typography } from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

function ExamHeader({ formattedTime, isSubmitting, onSubmit }) {
  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        inset: "0 0 auto 0",
        zIndex: 20,
        minHeight: { xs: 96, sm: 88 },
        px: { xs: 2, md: 4 },
        py: 2,
        bgcolor: "#2563eb",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        boxShadow: "0 2px 10px rgba(37, 99, 235, 0.28)",
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography component="h1" sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 800, lineHeight: 1.15 }}>
          Ôn Thi GPLX
        </Typography>
        <Typography sx={{ mt: 0.5, color: "rgba(255, 255, 255, 0.78)", fontSize: { xs: 14, md: 16 }, fontWeight: 600 }}>
          Đề thi ngẫu nhiên số 1
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: { xs: 1, sm: 2 }, flexShrink: 0 }}>
        <Chip
          icon={<AccessTimeRoundedIcon />}
          label={formattedTime}
          sx={{
            height: { xs: 42, sm: 48 },
            px: { xs: 1, sm: 1.5 },
            bgcolor: "#1d4ed8",
            color: "#fff",
            borderRadius: 1,
            fontSize: { xs: 17, sm: 20 },
            fontWeight: 800,
            letterSpacing: 0,
            "& .MuiChip-icon": { color: "#dbeafe", fontSize: 26, ml: 0.5 },
            "& .MuiChip-label": { px: { xs: 0.75, sm: 1 } },
          }}
        />
        <Button
          variant="contained"
          disabled={isSubmitting}
          onClick={() => onSubmit("Nộp bài thành công!", "success")}
          sx={{
            minHeight: { xs: 42, sm: 48 },
            px: { xs: 2, sm: 3 },
            bgcolor: "#22c55e",
            color: "#fff",
            borderRadius: 1.2,
            fontSize: { xs: 15, sm: 18 },
            fontWeight: 800,
            textTransform: "none",
            boxShadow: "0 8px 20px rgba(34, 197, 94, 0.28)",
            "&:hover": { bgcolor: "#16a34a" },
          }}
        >
          Nộp bài
        </Button>
      </Box>
    </Box>
  );
}

export default ExamHeader;
