import { Box, Checkbox, Paper, Typography } from "@mui/material";

function QuestionStatusList({ questions, answers, currentQuestionIndex, onQuestionSelect }) {
  return (
    <Box>
      <Typography sx={{ mb: 1.5, color: "#4b5563", fontSize: 16, fontWeight: 900 }}>
        TRẠNG THÁI TỪNG CÂU
      </Typography>

      <Box sx={{ display: "grid", gap: 1 }}>
        {questions.map((question, index) => {
          const isAnswered = answers[question.id] !== undefined;
          const isCurrent = currentQuestionIndex === index;

          return (
            <Paper
              key={question.id}
              variant="outlined"
              role="button"
              tabIndex={0}
              onClick={() => onQuestionSelect(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onQuestionSelect(index);
                }
              }}
              sx={{
                width: "100%",
                minHeight: 64,
                px: 1.25,
                py: 1,
                display: "grid",
                gridTemplateColumns: "64px 1fr",
                gap: 1,
                borderRadius: 1,
                borderColor: isCurrent ? "#f59e0b" : "#e5e7eb",
                bgcolor: isAnswered ? "#f8fbff" : "#fff",
                color: "#374151",
                cursor: "pointer",
                textAlign: "left",
                boxShadow: "none",
                "&:hover": {
                  borderColor: isCurrent ? "#f59e0b" : "#93c5fd",
                  bgcolor: "#f8fbff",
                },
              }}
            >
              <Typography sx={{ alignSelf: "center", color: "#374151", fontSize: 15, fontWeight: 900 }}>
                Câu {index + 1}
              </Typography>

              <Box sx={{ display: "grid", gap: 0.5 }}>
                <StatusCheckbox checked={!isAnswered} label="Chưa trả lời" color="#64748b" />
                <StatusCheckbox checked={isAnswered} label="Đã trả lời" color="#16a34a" />
              </Box>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
}

function StatusCheckbox({ checked, label, color }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
      <Checkbox
        checked={checked}
        readOnly
        size="small"
        sx={{
          p: 0,
          color: "#cbd5e1",
          "&.Mui-checked": {
            color,
          },
        }}
        inputProps={{ "aria-label": label }}
      />
      <Typography sx={{ color: "#4b5563", fontSize: 14, fontWeight: 800 }}>{label}</Typography>
    </Box>
  );
}

export default QuestionStatusList;
