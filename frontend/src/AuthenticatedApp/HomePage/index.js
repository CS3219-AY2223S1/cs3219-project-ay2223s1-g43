import { Stack } from "@mui/material";
import Header from "../../components/Header";
import AvatarMenu from "../components/Header/AvatarMenu";
import ChooseDifficultyPage from "./ChooseDifficultyPage";

const HomePage = () => {
  const buttons = (
    <Stack direction="row" spacing={1.5} >
      <AvatarMenu />
    </Stack>
  )



  return (
    <>
      <Header rightContent={buttons} />
      <ChooseDifficultyPage />
    </>
  )
}

export default HomePage;