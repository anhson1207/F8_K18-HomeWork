import { Box, Button, Typography } from "@mui/material";

function QuestionNumberGrid({ questions, answers, currentQuestionIndex, onQuestionSelect }) {
  return (
    <>
      <Typography
        component="h3"
        sx={{ mb: 2, color: "#4b5563", fontSize: 18, fontWeight: 900, letterSpacing: 0.8 }}
      >
        DANH SÁCH CÂU HỎI
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(46px, 1fr))",
          gap: 1.5,
          mb: 3,
        }}
      >
        {questions.map((question, index) => {
          const isCurrent = currentQuestionIndex === index;
          const isAnswered = answers[question.id] !== undefined;

          return (
            <Button
              key={question.id}
              onClick={() => onQuestionSelect(index)}
              sx={{
                minWidth: 0,
                height: 54,
                borderRadius: 1.25,
                bgcolor: isAnswered ? "#dbeafe" : "#f3f4f6",
                color: "#374151",
                border: isCurrent ? "2px solid #f59e0b" : "2px solid transparent",
                fontSize: 17,
                fontWeight: 800,
                textTransform: "none",
                boxShadow: isCurrent ? "0 0 0 3px rgba(245, 158, 11, 0.14)" : "none",
                "&:hover": {
                  bgcolor: isAnswered ? "#bfdbfe" : "#e5e7eb",
                },
              }}
            >
              {index + 1}
            </Button>
          );
        })}
      </Box>
    </>
  );
}

export default QuestionNumberGrid;
