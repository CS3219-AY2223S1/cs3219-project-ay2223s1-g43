import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import DifficultyCard from "./DifficultyCard";

const sx = {
  buttonBox: { py: 2 },
  container: { width: "100%", py: 8 },
  typography: { py: 1 }
}

const DIFFICULTIES = [
  { index: 0, name: "Easy", iconColor: "#39cce9" },
  { index: 1, name: "Medium", iconColor: "#e9b139" },
  { index: 2, name: "Hard", iconColor: "#e95039" },
]

const ChooseDifficultyPage = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  return (
    <Box sx={sx.container}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="h4" sx={sx.typography}>Choose a difficulty</Typography>
        {DIFFICULTIES.map(d =>
          <DifficultyCard
            cardContent={d.name}
            iconColor={d.iconColor}
            selected={selectedDifficulty === d.index}
            onClick={() => setSelectedDifficulty(d.index)}
          />
        )}
        <Box sx={sx.buttonBox}>
          <Button variant="contained" size="large" disabled={selectedDifficulty === null}>Start Session</Button>
        </Box>
      </Stack>
    </Box>
  )

}

export default ChooseDifficultyPage;