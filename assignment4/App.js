import React from 'react';
import { createAppContainer, createBottomTabNavigator  } from "react-navigation";
import { createStackNavigator  } from 'react-navigation-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GameMainScreen from './screens/GameMainScreen';
import GamePlayScreen from './screens/GamePlayScreen';
import GameScoreScreen from './screens/GameScoreScreen';
import GameSettingsScreen from './screens/GameSettingsScreen';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const TAB_NAVIGATOR_ACTIVE_COLOR = '#0000FF';
const GAME_TAB_NAVIGATOR_HEADER_COLOR = '#0000FF';

const GameTabNavigator = createStackNavigator( 
   {
      GameMain: GameMainScreen,
      GamePlay: GamePlayScreen,
      GameScore: GameScoreScreen
   },
   {
      initialRouteName: 'GameMain',
      navigationOptions: {
         headerTintColor: GAME_TAB_NAVIGATOR_HEADER_COLOR
      }
   }
);

const AppNavigator = createBottomTabNavigator( 
   {
      Game: GameTabNavigator,
      Settings: GameSettingsScreen 
   },
   {
      defaultNavigationOptions: ({ navigation }) => ({
         tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let IconComponent = Ionicons;
            let iconName;
        
            if (routeName === 'Game') {
               iconName = `ios-school`;
            } else if (routeName === 'Settings') {
               iconName = `ios-options`;
           }
           
           return <IconComponent name={iconName} size={25} color={TAB_NAVIGATOR_ACTIVE_COLOR} />;
         },
      }),
      tabBarOptions: {
         activeTintColor: TAB_NAVIGATOR_ACTIVE_COLOR
      }
   }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render () {
    return (
        <Provider store={store}>
          <AppContainer/>
        </Provider>
    )
  }
}