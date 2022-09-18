import { Card, CardContent, Stack, Typography, } from "@mui/material";
import Brightness1Icon from '@mui/icons-material/Brightness1';

const sx = {
  card: { width: "240px" },
  cardContent: { px: 4 },
  selectedStyles: { borderColor: 'primary.main' }
}

const DifficultyCard = (props) => {
  const { cardContent, iconColor, selected, onClick } = props
  return (
    <Card variant="outlined" sx={selected ? [sx.card, sx.selectedStyles] : [sx.card]} onClick={onClick}>
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