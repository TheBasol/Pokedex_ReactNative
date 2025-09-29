import { createContext, PropsWithChildren } from "react";

import {
    NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import { adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { useColorScheme } from "react-native";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const ThemeContext = createContext({
  isDark: false,
  theme: LightTheme,
});

export const ThemeContextProvider = ({children}: PropsWithChildren) => {

    const colorScheme = useColorScheme();

    const isDarkMode = colorScheme === 'dark';

const CombinedDefaultTheme = {
    ...MD3LightTheme,
    ...NavigationDefaultTheme,
    colors: {
      ...MD3LightTheme.colors,
      ...NavigationDefaultTheme.colors,
    },
  };
 
  const CombinedDarkTheme = {
      ...MD3DarkTheme,
      ...NavigationDarkTheme,
      colors: {
        ...MD3DarkTheme.colors,
        ...NavigationDarkTheme.colors,
      },
  };
 
  const theme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;
  const themePaper = isDarkMode ? MD3DarkTheme : MD3LightTheme;

    return (
        <PaperProvider theme={themePaper}>
          <NavigationContainer theme={theme}>
            <ThemeContext.Provider value={{ isDark: isDarkMode, theme }}>
              {children}
            </ThemeContext.Provider>
          </NavigationContainer>
        </PaperProvider>
    );
}