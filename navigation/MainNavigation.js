import { createStackNavigator, createAppContainer } from "react-navigation";
import { stackStyles } from "./config";

import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";

/// MessageNavigation
import GoodsMessageNavigation from "./MessageNavigation/GoodsMessageNavigation";
import PostMessageNavigation from "./MessageNavigation/PostMessageNavigation";
import ProfileMessageNavigation from "./MessageNavigation/ProfileMessageNavigation";
import SupportMessageNavigation from "./MessageNavigation/SupportMessageNavigation";

const MainNavigation = createStackNavigator(
  {
    TabNavigation,
    PhotoNavigation,

    /// MessageNavigation
    GoodsMessageNavigation,
    PostMessageNavigation,
    ProfileMessageNavigation,
    SupportMessageNavigation
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        ...stackStyles
      }
    },
    headerMode: "none",
    mode: "modal"
  }
);

export default createAppContainer(MainNavigation);
