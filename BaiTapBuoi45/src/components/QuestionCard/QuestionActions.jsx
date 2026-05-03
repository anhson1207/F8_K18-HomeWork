import { Box, Button } from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

function QuestionActions({ currentQuestionIndex, totalQuestions, onQuestionSelect }) {
  const previousQuestion = () => {
    onQuestionSelect(Math.max(currentQuestionIndex - 1, 0));
  };

  const nextQuestion = () => {
    onQuestionSelect(Math.min(currentQuestionIndex + 1, totalQuestions - 1));
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3.25 }}>
      <Button
        variant="contained"
        disabled={currentQuestionIndex === 0}
        startIcon={<ChevronLeftRoundedIcon />}
        onClick={previousQuestion}
        sx={actionButtonStyles}
      >
        Câu trước
      </Button>
      <Button
        variant="contained"
        disabled={currentQuestionIndex === totalQuestions - 1}
        endIcon={<ChevronRightRoundedIcon />}
        onClick={nextQuestion}
        sx={{ ...actionButtonStyles, fontWeight: 800 }}
      >
        Câu tiếp
      </Button>
    </Box>
  );
}

const actionButtonStyles = {
  flex: 1,
  minHeight: 48,
  bgcolor: "#f3f4f6",
  color: "#374151",
  borderRadius: 1,
  boxShadow: "none",
  fontSize: 16,
  fontWeight: 700,
  textTransform: "none",
  "&:hover": {
    bgcolor: "#e5e7eb",
    boxShadow: "none",
  },
};

export default QuestionActions;
