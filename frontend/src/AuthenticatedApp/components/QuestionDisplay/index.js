import { Stack, Typography } from "@mui/material";
import QuestionDisplaySkeleton from "./QuestionDisplaySkeleton";
import "../../../styles/question.css";

const sx = {
  stack: {
    height: "100%"
  }
}

const QuestionDisplay = (props) => {
  const { question } = props

  return (
    <>
      {question
        ? <Stack spacing={2} sx={sx.stack}>
          <Typography variant="h6">
            {question.title}
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: question.body }} />
        </Stack>
        : <QuestionDisplaySkeleton />
      }
    </>
  )
}

export default QuestionDisplay