import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation";

/// ----------
import Search from "../../../screens/Tabs/Search/Search";
import Search_Main from "../../../screens/Tabs/Search/Search_Main";
import Search_Main_User from "../../../screens/Tabs/Search/Search_Main_User";
import Search_Main_Time from "../../../screens/Tabs/Search/Search_Main_Time";
import Search_Main_Location from "../../../screens/Tabs/Search/Search_Main_Location";

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
      Search: { screen: Search },
      Search_Main: { screen: Search_Main },
      Search_Main_User: { screen: Search_Main_User },
      Search_Main_Time: { screen: Search_Main_Time },
      Search_Main_Location: { screen: Search_Main_Location },

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
