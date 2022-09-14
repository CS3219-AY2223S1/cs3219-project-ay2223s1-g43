import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const sx = {
  countdown: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}

const LoadingIcon = (props) => {
  const { setTimerExpired } = props
  const [timerValue, setTimerValue] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timerValue > 0) {
        setTimerValue(timerValue - 1);
      } else if (timerValue === 0) {
        setTimerExpired()
      }
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [timerValue]);

  return (
    <Box position="relative">
      <CircularProgress size="6rem" />
      <Box sx={sx.countdown}>
        {timerValue}
      </Box>
    </Box>
  )
}

export default LoadingIcon;