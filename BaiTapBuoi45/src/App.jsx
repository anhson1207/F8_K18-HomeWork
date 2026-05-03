import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box } from "@mui/material";
import ExamHeader from "./components/ExamHeader";
import ExamSnackbar from "./components/ExamSnackbar";
import QuestionCard from "./components/QuestionCard";
import QuestionSidebar from "./components/QuestionSidebar";
import { EXAM_DURATION, questions } from "./data/questions.js";
import { formatTime } from "./utils/formatTime.js";

function App() {
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const submitLockRef = useRef(false);

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestion.id];
  const formattedTime = useMemo(() => formatTime(timeLeft), [timeLeft]);
  const isAnswerDisabled = isSubmitting || timeLeft === 0;

  const resetExam = useCallback(() => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setTimeLeft(EXAM_DURATION);
  }, []);

  const handleSubmit = useCallback(
    (message = "Nộp bài thành công!", severity = "success") => {
      if (submitLockRef.current) {
        return;
      }

      submitLockRef.current = true;
      setIsSubmitting(true);
      setSnackbar({ open: true, message, severity });
      resetExam();

      window.setTimeout(() => {
        submitLockRef.current = false;
        setIsSubmitting(false);
      }, 500);
    },
    [resetExam],
  );

  useEffect(() => {
    if (isSubmitting) {
      return undefined;
    }

    if (timeLeft === 0) {
      handleSubmit("Hết giờ! Bài thi đã được nộp tự động.", "warning");
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setTimeLeft((previousTime) => Math.max(previousTime - 1, 0));
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [handleSubmit, isSubmitting, timeLeft]);

  const handleAnswerChange = (selectedOptionIndex) => {
    if (isAnswerDisabled) {
      return;
    }

    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [currentQuestion.id]: selectedOptionIndex,
    }));
  };

  const handleQuestionSelect = (questionIndex) => {
    setCurrentQuestionIndex(Math.min(Math.max(questionIndex, 0), questions.length - 1));
  };

  const handleCloseSnackbar = () => {
    setSnackbar((currentSnackbar) => ({ ...currentSnackbar, open: false }));
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f7f8fb" }}>
      <ExamHeader formattedTime={formattedTime} isSubmitting={isSubmitting} onSubmit={handleSubmit} />

      <Box
        component="main"
        sx={{
          pt: { xs: "96px", sm: "88px" },
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            flex: 1,
            p: { xs: 2, sm: 4, lg: 6 },
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <QuestionCard
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            selectedAnswer={selectedAnswer}
            disabled={isAnswerDisabled}
            onAnswerChange={handleAnswerChange}
          />
        </Box>

        <QuestionSidebar
          questions={questions}
          answers={answers}
          currentQuestionIndex={currentQuestionIndex}
          onQuestionSelect={handleQuestionSelect}
        />
      </Box>

      <ExamSnackbar snackbar={snackbar} onClose={handleCloseSnackbar} />
    </Box>
  );
}

export default App;
