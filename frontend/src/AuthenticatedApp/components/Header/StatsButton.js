import InsightsIcon from '@mui/icons-material/Insights';
import { IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StatsButton = () => {
  const navigate = useNavigate()

  const onClick = () => {
    navigate("/learning-pathway")
  }

  return (
    <Tooltip title="Learning Pathway">
      <IconButton variant="outlined" color="primary" aria-label="stats" onClick={onClick}>
        <InsightsIcon />
      </IconButton>
    </Tooltip>
  )
}

export default StatsButton