import React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';

const MovieDetailsItem = (props) => (
   <View style={oStyles.container}>
      <Text style={oStyles.title}>{props.Title}</Text>
      
      <Image style={oStyles.image} source={{uri: props.Poster}} />
      
      <View style={oStyles.containerInfo}>
         <Text style={oStyles.plot}>{props.Plot}</Text>
         
         <Text>{'imdbID: ' + props.imdbID}</Text>
         <Text>{'Year: ' + props.Year}</Text>
         
         <Text>{'Rated: ' + props.Rated}</Text>
         <Text>{'Released: ' + props.Released}</Text>
         <Text>{'Runtime: ' + props.Runtime}</Text>
         <Text>{'Genre: ' + props.Genre}</Text>
         <Text>{'Director: ' + props.Director}</Text>
         <Text>{'Writer: ' + props.Writer}</Text>
         <Text>{'Actors: ' + props.Actors}</Text>
         
         <Text>{'DVD: ' + props.DVD}</Text>
         <Text>{'BoxOffice: ' + props.BoxOffice}</Text>
         <Text>{'Production: ' + props.Production}</Text>
         
         <Text>{'Language: ' + props.Language}</Text>
         <Text>{'Country: ' + props.Country}</Text>

         <Text>{'Awards: ' + props.Awards}</Text>
         
         <Text>{'Metascore: ' + props.Metascore}</Text>
         <Text>{'imdbRating: ' + props.imdbRating}</Text>
         <Text>{'imdbVotes: ' + props.imdbVotes}</Text>
         <Text>{'Website: ' + props.Website}</Text>
      </View>
   </View>
)

const oStyles = StyleSheet.create({
   container: {
      marginTop: 5,
      marginBottom: 20
   },
   containerInfo: {
      marginTop: 10,
      marginHorizontal: 5
   },
   plot: {
      marginBottom: 10,
      fontWeight: 'bold',
      color: 'green'
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

export default MovieDetailsItem