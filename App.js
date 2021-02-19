/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Text
} from 'react-native';
import { LogBox } from 'react-native';


import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faPlusCircle, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import AuthLoading from './components/AuthLoading';
import CustomUserBooksCard from './components/CustomUserBooksCard';
import ForgotPassword from './components/forgotpassword';

import Signin from './components/signin';
import Signup from './components/signup';
import Userbooks from './components/userbooks';
import Profile from './components/profile';
import SearchBook from './components/searchbooks';

import styles from './styles/global';
import DeleteAccount from './components/DeleteAccount';


const TabStack = createMaterialBottomTabNavigator(
  {
    Books: {
      screen: Userbooks,
      navigationOptions: {
        tabBarLabel: <Text style={styles.font}>Home</Text>,
        tabBarIcon: ({ tintColor }) => (
          <FontAwesomeIcon icon={faHome} size={25} color={tintColor} />
        ),

      },
    },
    SearchBook: {
      screen: SearchBook,
      navigationOptions: {
        tabBarLabel: <Text style={styles.font}>Search</Text>,
        tabBarIcon: ({ tintColor }) => (
          <FontAwesomeIcon icon={faSearch} size={25} color={tintColor} />
        )
      }
    },

  },
  {
    initialRouteName: 'Books',
    barStyle: {
      backgroundColor: '#2e86de'
    },

  }
);

const AppStack = createStackNavigator({
  Tabs: TabStack,
  ForgotPassword: ForgotPassword,
  CustomUserBooksCard: CustomUserBooksCard,
  Profile:Profile,
  DeleteAccount:DeleteAccount
}, {
  initialRouteName: 'Tabs',
  headerMode: 'none'
});

const AuthStack = createStackNavigator({
  Signin: Signin,
  Signup: Signup
}, {
  initialRouteName: 'Signin',
  headerMode: 'none'
});

LogBox.ignoreAllLogs(true);



export default createAppContainer(createSwitchNavigator({
  AuthLoading: AuthLoading,
  App: AppStack,
  Auth: AuthStack
}, {
  initialRouteName: 'AuthLoading'
}));
