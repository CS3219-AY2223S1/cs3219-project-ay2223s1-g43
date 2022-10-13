import { Container } from "@mui/material"
import QuestionDisplay from "./QuestionDisplay"

const sx = {
  content: {
    py: 2
  }
}


const RoomPageContent = (props) => {
  const { question } = props
  return (
    <Container maxWidth="xl" sx={sx.content}>
      <QuestionDisplay question={question}/>
      {/* TODO: add code editor on the right */}
    </Container>
  )
}

export default RoomPageContent