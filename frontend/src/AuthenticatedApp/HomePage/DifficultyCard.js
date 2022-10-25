import { Card, CardContent, Stack, Typography, } from "@mui/material";
import Brightness1Icon from '@mui/icons-material/Brightness1';

const sx = {
  card: {
    width: "240px",
    '&:hover': {
      cursor: 'pointer',
    }
  },
  cardContent: { px: 4 },
  unselectedStyles: {
    '&:hover': {
      borderColor: 'primary.dark',
    }
  },
  selectedStyles: { borderColor: 'primary.main' }
}

const DifficultyCard = (props) => {
  const { cardContent, iconColor, selected, onClick } = props
  return (
    <Card variant="outlined" sx={selected ? [sx.card, sx.selectedStyles] : [sx.card, sx.unselectedStyles]} onClick={onClick} component="button">
      <CardContent sx={sx.cardContent}>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={3}
        >
          <Brightness1Icon style={{ color: iconColor }} />
          <Typography variant="h6" >{cardContent}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default DifficultyCard;