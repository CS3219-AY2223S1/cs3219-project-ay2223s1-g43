import { Stack } from "@mui/material"
import Header from "../../../components/Header"
import AvatarMenu from "./AvatarMenu"
import StatsButton from "./StatsButton"

const AuthenticatedHeader = () => {
  const buttons = (
    <Stack direction="row"
      justifyContent="flex-end"
      alignItems="center"
      spacing={0} >
      <StatsButton />
      <AvatarMenu />
    </Stack >
  )

  return (
    <Header rightContent={buttons} />
  )
}

export default AuthenticatedHeader;