import * as React from "react";
import { BottomNavigation } from "react-native-paper";
import { LotoScreen, HomeScreen } from "./screens";

const Main = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "homeScreen", title: "Phiếu dò", focusedIcon: "home" },
    {
      key: "lotoScreen",
      title: "Dò lô tô",
      focusedIcon: "check",
      unfocusedIcon: "check-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    lotoScreen: LotoScreen,
    homeScreen: HomeScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      style={{
        flex: 1,
      }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Main;
