import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import Main from "./src";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LotoScreen, HomeScreen } from "./src/screens";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Phiếu dò" }}
          />
          <Stack.Screen
            name="LotoScreen"
            component={LotoScreen}
            options={{ title: "Dò lô tô" }}
          />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
