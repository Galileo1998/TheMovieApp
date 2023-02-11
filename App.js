import React, {useMemo, useState} from 'react';
import {SafeAreaView, YellowBox} from 'react-native';
import { 
  Provider as PaperProvider,
  MD2DarkTheme as DarkThemePaper, 
  DefaultTheme as DefaultThemePaper} 
from 'react-native-paper';

import {NavigationContainer, 
  DarkTheme as DarkThemeNavigation, 
  DefaultTheme as DefaultThemeNavigation} 
from "@react-navigation/native";
import TabNavigation from './src/navigation/TabNavigation';
import PreferencesContext from './src/context/PreferencesContext';

YellowBox.ignoreWarnings(['Remote debugger is in a background tab', 
                          'YellowBox has been replaced with',
                          'Debugger and device times have',
                          'Warning: useEffect must not return anything besides a function, which is used for clean-up.',
                          'ViewPropTypes will be removed from',
                          'Possible Unhandled Promise']);

export default function App(props){
  const [theme, setTheme] = useState('Dark'); 
  DefaultThemePaper.colors.primary = "#1AE1F2";
  DarkThemePaper.colors.primary = "#1AE1F2";
  DarkThemePaper.colors.accent = "#1AE1F2";

  DarkThemeNavigation.colors.background = "#192734";
  DarkThemeNavigation.colors.card = "#15212B";
  

  const toggleTheme = () =>{
    setTheme(theme === "Dark" ? "Light": "Dark")
  }

  const preference = useMemo(
    () => ({
      toggleTheme,
      theme,
    }),
    [theme],
  );

  return(
    <PreferencesContext.Provider value={preference}>
      <PaperProvider theme={theme === "Dark" ? DarkThemePaper : DefaultThemePaper}>
          <NavigationContainer theme={theme === "Dark" ?DarkThemeNavigation: DefaultThemeNavigation}>
            <TabNavigation/>
          </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}