import { createStackNavigator, createAppContainer } from "react-navigation";

import Confirm from "../screens/Auth/Confirm";
import Login from "../screens/Auth/Login";
import AuthHome from "../screens/Auth/AuthHome";
import SignupDetail from "../screens/Auth/SignupDetail";

const AuthNavigation = createStackNavigator(
  {
    AuthHome,
    Confirm,
    SignupDetail,
    Login
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(AuthNavigation);
