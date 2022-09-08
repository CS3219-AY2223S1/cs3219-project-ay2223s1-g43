import { Box } from "@mui/material";
import Header from "../../components/Header";
import LogOutButton from "../../components/Header/LogOutButton";

// TODO: implement
const HomePage = () => {
  return (
    <>
      <Header rightContent={<LogOutButton />} />
      <Box>home page</Box>
    </>
  )
}

export default HomePage;