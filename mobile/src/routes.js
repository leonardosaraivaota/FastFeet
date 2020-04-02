import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

// import SelectProvider from '~/pages/New/SelectProvider';
// import SelectDateTime from '~/pages/New/SelectDateTime';
// import Confirm from '~/pages/New/Confirm';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Delivery from './pages/Delivery';
import DeliveryDetail from './pages/Delivery/Detail';
import DeliveryConfirm from './pages/Delivery/Confirm';
import DeliveryProblemList from './pages/DeliveryProblem';
import DeliveryProblemNew from './pages/DeliveryProblem/New';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            // Dashboard,
            // DeliveryDetail,
            Dashboard,
            New: {
              screen: createStackNavigator(
                {
                  DeliveryDetail,
                  DeliveryConfirm,
                  DeliveryProblemNew,
                  DeliveryProblemList,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: false,
                    headerTintColor: '#fff',
                    headerStyle: {
                      backgroundColor: '#7159c1',
                    },
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarVisible: false,
                tabBarLabel: 'Agendar',
                tabBarIcon: (
                  <Icon
                    name="add-circle-outline"
                    size={20}
                    color="rgba(255, 255, 255, 0.6)"
                  />
                ),
              },
            },
            Profile,
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#ffff',
              inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
              style: {
                backgroundColor: '#8d41a8',
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
