import { useGetLevelQuery } from "@/entities/app/api";
import {
  Box,
  Button,
  ButtonBase,
  ButtonProps,
  CircularProgress,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as XmarkIcon } from "@/app/assets/icons/xmark.svg";
import { ReactComponent as HeartIcon } from "@/app/assets/icons/heart.svg";
import { Colors } from "@/app/constants";

const CustomButton: React.FC<
  ButtonProps & { isActive?: boolean; isError?: boolean }
> = ({ isActive, ...props }) => (
  <Button
    {...props}
    sx={{
      border: `1px solid #B0B8CC`,
      backgroundColor: isActive ? Colors.TURQUOISE : "transparent",
      "&:hover": {
        color: "#fff",
      },
    }}
  />
);

export const TestsGame = () => {
  const { level } = useParams<{ level: string }>();

  const [lifes, setLifes] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>();
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>();

  const { data } = useGetLevelQuery(Number(level), { skip: !level });

  const onAnswer = (answer: string) => {
    if (typeof isCorrect !== "undefined") return;
    if (answer === data?.tasks[currentIndex].correctAnswer) {
      setIsCorrect(true);
      setCorrectAnswers((prev) => prev + 1);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setSelectedAnswer(undefined);
        setIsCorrect(undefined);
      }, 1000);
    } else {
      setIsCorrect(false);
      setLifes((prev) => prev - 1);
    }
    setSelectedAnswer(answer);
  };

  if (!data) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  const currentQuestion = data.tasks[currentIndex];

  return (
    <Container sx={{ minHeight: "100%" }} component={Stack}>
      {(() => {
        if (!lifes) {
          return <Typography>Ты проиграл. Попробуй еще раз.</Typography>;
        }

        if (currentIndex === data.tasks.length) {
          return (
            <Typography>
              Ты ответил правильно на {correctAnswers} из {data.tasks.length}{" "}
              вопросов
            </Typography>
          );
        }

        return (
          <>
            <Stack direction="row" justifyContent="space-between">
              <ButtonBase
                sx={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                }}
              >
                <Box component={XmarkIcon} />
              </ButtonBase>

              <Stack direction="row" spacing={1}>
                <Box component={HeartIcon} />
                <Box color="#FF4B4B" sx={{ cursor: "default" }}>
                  x{lifes}
                </Box>
              </Stack>
            </Stack>

            <Box
              sx={{
                mt: 2,
                px: 3,
              }}
            >
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  backgroundColor: Colors.PRIMARY,
                  borderRadius: "8px",
                  py: 8,
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "128px",
                  }}
                >
                  {currentQuestion.question}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                justifyContent="center"
                spacing={4}
                sx={{
                  mt: 2,
                }}
              >
                <CustomButton
                  isActive={selectedAnswer === currentQuestion.var1}
                  onClick={() => onAnswer(currentQuestion.var1)}
                  isError={isCorrect === false}
                >
                  {currentQuestion.var1}
                </CustomButton>
                <CustomButton
                  isActive={selectedAnswer === currentQuestion.var2}
                  onClick={() => onAnswer(currentQuestion.var2)}
                  isError={isCorrect === false}
                >
                  {currentQuestion.var2}
                </CustomButton>
                <CustomButton
                  isActive={selectedAnswer === currentQuestion.var3}
                  onClick={() => onAnswer(currentQuestion.var3)}
                  isError={isCorrect === false}
                >
                  {currentQuestion.var3}
                </CustomButton>
                <CustomButton
                  isActive={selectedAnswer === currentQuestion.var4}
                  onClick={() => onAnswer(currentQuestion.var4)}
                  isError={isCorrect === false}
                >
                  {currentQuestion.var4}
                </CustomButton>
              </Stack>
              <Divider sx={{ my: 4 }} />
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <CustomButton
                  sx={{
                    borderColor: Colors.TURQUOISE,
                    color: Colors.TURQUOISE,
                  }}
                >
                  Пропустить
                </CustomButton>
                <Typography
                  sx={{
                    color:
                      isCorrect === true
                        ? Colors.TURQUOISE
                        : isCorrect === false
                        ? Colors.ERROR
                        : "",
                    fontSize: "22px",
                    fontWeight: 500,
                  }}
                >
                  {isCorrect === true
                    ? "Правильно"
                    : isCorrect === false
                    ? "Неправильно"
                    : ""}
                </Typography>
                <Button
                  sx={{
                    color: "#fff",
                  }}
                >
                  {currentIndex + 1}/{data.tasks.length}
                </Button>
              </Stack>
            </Box>
          </>
        );
      })()}
    </Container>
  );
};
