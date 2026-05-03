import { Box, Paper } from "@mui/material";
import QuestionActions from "../QuestionCard/QuestionActions";
import QuestionNumberGrid from "./QuestionNumberGrid";
import QuestionStatusList from "./QuestionStatusList";

function QuestionSidebar({ questions, answers, currentQuestionIndex, onQuestionSelect }) {
  return (
    <Paper
      elevation={0}
      sx={{
        width: { xs: "100%", lg: 390 },
        minHeight: { lg: "calc(100vh - 88px)" },
        p: { xs: 2, sm: 3 },
        borderRadius: 0,
        borderLeft: { lg: "1px solid #e5e7eb" },
        bgcolor: "#fff",
      }}
    >
      <QuestionActions
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        onQuestionSelect={onQuestionSelect}
      />

      <Box sx={{ height: "1px", bgcolor: "#eef2f7", mb: 3.25 }} />

      <QuestionNumberGrid
        questions={questions}
        answers={answers}
        currentQuestionIndex={currentQuestionIndex}
        onQuestionSelect={onQuestionSelect}
      />

      <QuestionStatusList
        questions={questions}
        answers={answers}
        currentQuestionIndex={currentQuestionIndex}
        onQuestionSelect={onQuestionSelect}
      />
    </Paper>
  );
}

export default QuestionSidebar;
