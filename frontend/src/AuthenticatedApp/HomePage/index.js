import Header from "../../components/Header";
import AvatarMenu from "../../components/Header/AvatarMenu";
import ChooseDifficultyPage from "./ChooseDifficultyPage";

// TODO: implement
const HomePage = () => {
  return (
    <>
      <Header rightContent={<AvatarMenu />} />
      <ChooseDifficultyPage/>
    </>
  )
}

export default HomePage;