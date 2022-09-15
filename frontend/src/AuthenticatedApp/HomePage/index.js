import { Box } from "@mui/material";
import Header from "../../components/Header";
import AvatarMenu from "../../components/Header/AvatarMenu";

// TODO: implement
const HomePage = () => {
  return (
    <>
      <Header rightContent={<AvatarMenu />} />
      <Box>home page</Box>
    </>
  )
}

export default HomePage;