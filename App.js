import React from 'react'
import { Platform, StatusBar, AppRegistry, Button, Alert } from 'react-native'
import { StackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen'
import CardScreen from './CardScreen'
import HelpScreen from './HelpScreen'

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
        // header: {
        //   right: <Button title={"Save"} onPress={() => Alert.alert('ijijijij')} />
        // }
          // navigatorButtons: {
          //   rightButtons: [
          //     {
          //       title: 'Guardar tarjeta', // for a textual button, provide the button title (label)
          //       id: 'save', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
          //       icon: require('./assets/img/favorite-button.png'), // for icon button, provide the local image asset name
          //       disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
          //       buttonFontSize: 16, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
          //       buttonFontWeight: '400', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
          //     }
          //   ]
          // }
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