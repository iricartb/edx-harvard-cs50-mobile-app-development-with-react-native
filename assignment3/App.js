import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SearchMoviesScreen from './screens/SearchMoviesScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';

const AppNavigator = createStackNavigator(
  {
    SearchMovies: SearchMoviesScreen,
    MovieDetails: MovieDetailsScreen,
  },
  {
    initialRouteName: 'SearchMovies',
  }
);

const App = createAppContainer(AppNavigator);

export default App;