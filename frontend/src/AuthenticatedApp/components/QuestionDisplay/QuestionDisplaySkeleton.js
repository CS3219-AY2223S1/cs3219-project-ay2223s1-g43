import { Skeleton, Stack } from "@mui/material";

const sx = {
  stack: {
    height: "100%"
  }
}

const QuestionDisplaySkeleton = () => {
  return (
    <Stack spacing={2} sx={sx.stack}>
      <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
      <Skeleton variant="rounded" height={240} />
    </Stack>
  )
}

export default QuestionDisplaySkeleton;