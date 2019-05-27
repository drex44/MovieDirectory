import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Root from "./Root";
import Movie from "./Movie";
import MovieForm from "./MovieForm";

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
        },
        Movie: {
          screen: ({ navigation }) => (
            <Movie
              movie={navigation.state.params.movie}
              navigation={navigation}
            />
          ),
          navigationOptions: ({ navigation }) => ({
            title: navigation.state.params.movie.title
          })
        },
        NewMovie: {
          screen: ({ navigation }) => {
            const { database } = props;
            return <MovieForm database={database} navigation={navigation} />;
          },
          navigationOptions: { title: "New Movie" }
        },
        EditMovie: {
          screen: ({ navigation }) => {
            return (
              <MovieForm
                movie={navigation.state.params.movie}
                navigation={navigation}
              />
            );
          },
          navigationOptions: ({ navigation }) => ({
            title: `Edit "${navigation.state.params.movie.title}"`
          })
        }
      },
      {
        initialRouteName: "Root",
        initialRouteParams: props
      }
    )
  );
