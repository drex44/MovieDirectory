import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Root from "./Root";

export const createNavigation = props =>
  createAppContainer(
    createStackNavigator(
      {
        Root: {
          // We have to use a little wrapper because React Navigation doesn't pass simple props (and withObservables needs that)
          screen: ({ navigation }) => {
            const { database } = props;
            return <Root database={database} navigation={navigation} />;
          },
          navigationOptions: { title: "Movies" }
        }
      },
      {
        initialRouteName: "Root",
        initialRouteParams: props
      }
    )
  );
