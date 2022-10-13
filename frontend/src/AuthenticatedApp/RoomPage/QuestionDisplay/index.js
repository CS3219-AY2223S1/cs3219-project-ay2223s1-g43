import { Skeleton, Stack, Typography } from "@mui/material";
import "../../../styles/question.css";

const QuestionDisplay = (props) => {
  const { question } = props

  return (
    <Stack spacing={2}>
      {question
        ? <Typography variant="h6">
          {question.title}
        </Typography>
        : <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      }
      {question
        ? <div dangerouslySetInnerHTML={{__html: question.body}} />
        : <Skeleton variant="rounded" height={240} />
      }
    </Stack>
  )
}

export default QuestionDisplay