import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SearchMovieItem = (props) => (
<View style={oStyles.container}>
   <TouchableOpacity onPress={() => { props.onSelect(props) }}>
      <View style={oStyles.separator} /> 
      <Text style={oStyles.title}>{props.Title}</Text>
   </TouchableOpacity>
   <Image style={oStyles.image} source={{uri: props.Poster}} />
   </View>
)

const oStyles = StyleSheet.create({
   container: {
      marginTop: 5,
      marginBottom: 20
   },
   separator: {
      borderBottomColor: 'lightgray',
      borderBottomWidth: 1,
      marginBottom: 10
   },
   image: {
      width: 300,
      height: 466   
   },
   title: {
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'blue',
      marginBottom: 5
   }
});

export default SearchMovieItem