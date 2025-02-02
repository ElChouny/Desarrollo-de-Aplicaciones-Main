import React, { useEffect } from 'react';
import { StatusBar } from 'react-native'
import Colors from './src/globals/Colors'
import { useFonts } from 'expo-font'
import Fonts from './src/globals/Fonts'
import Navigator from './src/navigation/Navigator'
import { Provider } from 'react-redux'
import { store } from './src/store'
import { createSessionTable } from './src/config/dbSqlite'

export default function App() {
  const [fontsLoaded] = useFonts(Fonts);

  useEffect(() => {
    (async () => {
      try {
        const response = await createSessionTable();
        console.log(response);
      } catch (error) {
        console.error('Error during initialization:', error);
      }
    })();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Provider store={store}>
        <Navigator />
      </Provider>
      <StatusBar style="light" backgroundColor={Colors.Celeste} />
    </>
  );
}
