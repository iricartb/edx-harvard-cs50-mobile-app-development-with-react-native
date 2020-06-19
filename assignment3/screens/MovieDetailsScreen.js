import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import MovieDetailsItem from '../components/MovieDetailsItem';

export default class MovieDetailsScreen extends React.Component {
   static navigationOptions = ({navigation}) => ({
      headerTitle: navigation.getParam('oSelectedMovie').Title
   });
   
   render() {
      return (
         <View style={oStyles.container}>
            <MovieDetailsItem {...this.props.navigation.getParam('oSelectedMovie')} />
         </View>
      );
   }
}

const oStyles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 5
   }
});