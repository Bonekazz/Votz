import Home from "./components/Home";
import MainMenuDrawer from "./components/MainMenuDrawer";

export default async function SSRHome() {
  return (
    <MainMenuDrawer title="Início">
      <Home/>
    </MainMenuDrawer>
  )
}
