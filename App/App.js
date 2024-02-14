import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import Main from "./src";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};
export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Main />
    </PaperProvider>
  );
}
