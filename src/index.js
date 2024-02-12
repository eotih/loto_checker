import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import { LotoScreen, HomeScreen } from "./screens";

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "homeScreen", title: "Home", focusedIcon: "home" },
    {
      key: "lotoScreen",
      title: "Lô tô Checker",
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

export default MyComponent;
