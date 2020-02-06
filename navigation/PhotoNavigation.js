import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation";

/// ----------
import TakePhoto from "../screens/Photo/TakePhoto";
import Upload_Prepare from "../screens/Photo/Upload_Prepare";
/// ----------
export default createStackNavigator(
  {
    InitialRoute: { screen: TakePhoto },
    Upload_Prepare: { screen: Upload_Prepare }
  },
  {
    defaultNavigationOptions: {
      headerStyle: { height: 0, borderStyle: "dotted", elevation: 0 },
      headerLeft: <View></View>
    }
  }
);
