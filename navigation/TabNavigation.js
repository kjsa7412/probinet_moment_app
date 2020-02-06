import React from "react";
import { View, Platform } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

/// ----------
import NavIcon from "../components/NavIcon";
import HomeStackFactory from "./StackFactory/TabStackFactory/HomeStackFactory";
import SearchStackFactory from "./StackFactory/TabStackFactory/SearchStackFactory";
import AlarmStackFactory from "./StackFactory/TabStackFactory/AlarmStackFactory";
import ProfileStackFactory from "./StackFactory/TabStackFactory/ProfileStackFactory";

/// ----------;

/// ----------
const stackFactory = initialRoute =>
  createStackNavigator(
    {
      InitialRoute: {
        screen: initialRoute
      }
    },
    {
      defaultNavigationOptions: {
        headerStyle: { height: 0, borderStyle: "dotted", elevation: 0 },
        headerLeft: <View></View>
      }
    }
  );

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeStackFactory(),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-home" : "md-home"}
          />
        )
      }
    },

    Search: {
      screen: SearchStackFactory(),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-search" : "md-search"}
          />
        )
      }
    },

    Add: {
      screen: View,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) =>
          navigation.navigate("PhotoNavigation"),
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"}
          />
        )
      }
    },

    Alarm: {
      screen: AlarmStackFactory(),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={
              Platform.OS === "ios" ? "ios-notifications" : "md-notifications"
            }
          />
        )
      }
    },
    Profile: {
      screen: ProfileStackFactory(),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-person" : "md-person"}
          />
        )
      }
    }
  },
  {
    initialRouteName: "Home",
    tabBarOptions: {
      showLabel: false,
      style: {
        height: 45,
        backgroundColor: "#FFFFFF",
        borderStyle: "dotted",
        borderTopWidth: 0
      }
    }
  }
);
