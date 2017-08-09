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
        headerStyle: {
          elevation: 1,
          shadowOpacity: 1,
        }
      })
    }
  },
  {
    cardStyle: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
      shadowColor: 'transparent'
    },
    navigationOptions: {
        headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
        }
    },
    headerMode: 'screen',
  }
);

AppRegistry.registerComponent('App', () => App);

export default App;