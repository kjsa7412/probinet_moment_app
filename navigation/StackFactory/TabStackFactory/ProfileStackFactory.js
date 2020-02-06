import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation";

/// ----------
import Profile from "../../../screens/Tabs/Profile/Profile";
import Profile_Setting from "../../../screens/Tabs/Profile/Profile_Setting";
import Profile_Follower from "../../../screens/Tabs/Profile/Profile_Follower";
import Profile_Following from "../../../screens/Tabs/Profile/Profile_Following";

/// Common - Post
import Post from "../../../screens/Post/Post";
import Post_Edit_Write from "../../../screens/Post/Post_Edit_Write";
import Post_Edit_Report from "../../../screens/Post/Post_Edit_Report";
import Post_Edit_Photo from "../../../screens/Post/Post_Edit_Photo";
import Post_Edit_Location from "../../../screens/Post/Post_Edit_Location";

/// Common - Profile
import Profile_User from "../../../screens/Tabs/Profile/Profile_User";
import Profile_Message_New from "../../../screens/Tabs/Profile/Profile_Message_New";
import Profile_Message_List from "../../../screens/Tabs/Profile/Profile_Message_List";
/// ------------------------

/// ----------
export default () =>
  createStackNavigator(
    {
      Profile: { screen: Profile },
      Profile_Setting: { screen: Profile_Setting },
      Profile_Follower: { screen: Profile_Follower },
      Profile_Following: { screen: Profile_Following },

      /// Common - Post
      Post: { screen: Post },
      Post_Edit_Write: { screen: Post_Edit_Write },
      Post_Edit_Report: { screen: Post_Edit_Report },
      Post_Edit_Photo: { screen: Post_Edit_Photo },
      Post_Edit_Location: { screen: Post_Edit_Location },

      /// Common - Profile
      Profile_User: { screen: Profile_User },
      Profile_Message_New: { screen: Profile_Message_New },
      Profile_Message_List: { screen: Profile_Message_List }

      /// ------------------------
    },
    {
      defaultNavigationOptions: {
        headerStyle: { height: 0, borderStyle: "dotted", elevation: 0 },
        headerLeft: <View></View>
      }
    }
  );
