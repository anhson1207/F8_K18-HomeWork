import { Box, Card, Chip, FormControlLabel, Paper, Radio, RadioGroup, Typography } from "@mui/material";

function QuestionCard({ question, questionNumber, selectedAnswer, disabled, onAnswerChange }) {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 980,
        p: { xs: 2.25, sm: 4 },
        borderRadius: 2,
        boxShadow: "0 8px 30px rgba(15, 23, 42, 0.06)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, flexWrap: "wrap", mb: 3.5 }}>
        <Chip
          label={`Câu ${questionNumber}`}
          sx={{ height: 42, bgcolor: "#dbeafe", color: "#1d4ed8", borderRadius: 1, fontSize: 18, fontWeight: 800 }}
        />
        <Typography
          component="h2"
          sx={{
            flex: 1,
            minWidth: { xs: "100%", sm: 280 },
            color: "#1f2937",
            fontSize: { xs: 22, md: 28 },
            fontWeight: 800,
            lineHeight: 1.35,
          }}
        >
          {question.question}
        </Typography>
      </Box>

      <RadioGroup value={selectedAnswer ?? ""} onChange={(event) => onAnswerChange(Number(event.target.value))} sx={{ gap: 2 }}>
        {question.options.map((option, optionIndex) => {
          const isSelected = selectedAnswer === optionIndex;

          return (
            <Paper
              key={option}
              variant="outlined"
              sx={{
                borderRadius: 2,
                borderColor: isSelected ? "#2563eb" : "#e5e7eb",
                bgcolor: isSelected ? "#eff6ff" : "#fff",
                boxShadow: isSelected ? "0 0 0 1px #2563eb" : "none",
                transition: "border-color 160ms ease, background-color 160ms ease, box-shadow 160ms ease",
                "&:hover": {
                  borderColor: disabled ? (isSelected ? "#2563eb" : "#e5e7eb") : "#93c5fd",
                  bgcolor: disabled ? (isSelected ? "#eff6ff" : "#fff") : "#f8fbff",
                },
              }}
            >
              <FormControlLabel
                value={optionIndex}
                disabled={disabled}
                control={
                  <Radio
                    sx={{
                      color: "#d1d5db",
                      "&.Mui-checked": { color: "#2563eb" },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: "#374151", fontSize: { xs: 16, md: 18 }, fontWeight: 600, lineHeight: 1.45 }}>
                    {option}
                  </Typography>
                }
                sx={{
                  width: "100%",
                  m: 0,
                  px: { xs: 1.5, sm: 2 },
                  py: { xs: 1.4, sm: 2 },
                  alignItems: "center",
                  cursor: disabled ? "default" : "pointer",
                  "& .MuiFormControlLabel-label": { width: "100%" },
                }}
              />
            </Paper>
          );
        })}
      </RadioGroup>
    </Card>
  );
}

export default QuestionCard;
