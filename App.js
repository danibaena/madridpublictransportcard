import React from 'react'
import { Platform, StatusBar } from 'react-native'
import { StackNavigator } from 'react-navigation';
import HomeScreen from './src/Components/Screens/HomeScreen'
import CardScreen from './src/Components/Screens/CardScreen'
import HelpScreen from './src/Components/Screens/HelpScreen'

/* Navigation Routes */

const App = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
      })
    },
    Card: {
      screen: CardScreen,
      navigationOptions: ({ navigation }) => ({
      })
    },
    Help: {
      screen: HelpScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Ayuda',
      })
    }
  },
  {
    cardStyle: {
      shadowColor: 'transparent'
    },
    navigationOptions: {
        headerStyle: {
            elevation: 1,
            shadowOpacity: 1,
        }
    },
    headerMode: 'screen',
  }
);

export default App;