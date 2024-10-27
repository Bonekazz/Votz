import MainMenuDrawer from "../components/MainMenuDrawer";
import Players from "./components/Players";

export default async function SSRPlayers() {
  return (
    <MainMenuDrawer title="Seus jogadores">
      <Players />
    </MainMenuDrawer>
  );
}
