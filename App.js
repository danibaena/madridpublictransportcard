import { Platform, StatusBar, AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen'
import CardScreen from './CardScreen'

const App = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Inicio'
      })
    },
    Card: {
      screen: CardScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Tarjeta'
      })
    }
  },
  {
    cardStyle: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
      shadowColor: 'transparent'
    }
  }
);

AppRegistry.registerComponent('App', () => App);

export default App;