import React from 'react'
import { Platform, StatusBar, AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen'
import CardScreen from './CardScreen'
import HelpScreen from './HelpScreen'

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

AppRegistry.registerComponent('App', () => App);

export default App;