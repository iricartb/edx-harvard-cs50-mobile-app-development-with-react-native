import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import SearchMoviesForm from '../components/SearchMoviesForm';
import SearchMovieItem from '../components/SearchMovieItem';

const URL_FECTH_SEARCH = 'https://www.omdbapi.com/?apikey=eef57751&s=';
const URL_FECTH_MOVIE = 'https://www.omdbapi.com/?apikey=eef57751&i=';

export default class SearchMoviesScreen extends React.Component {
   static navigationOptions = {
      headerTitle: 'Movie Browser - OMDb API REST'
   }
   
   constructor(props) {
      super(props);
      
      this.state = {
         oSearchMovies: [],
         nSearchResults: 0,
         oSelectedMovie: null
      }
   }
   
   onSubmitSearchMoviesForm = (oFormState) => {
      this.searchMoviesForPage(oFormState.sTextInputSearch, 1);
   }
   
   searchMoviesForPage = (sSearch, nPage) => {
      fetch(URL_FECTH_SEARCH + sSearch + '&page=' + nPage)
      .then(response => { return response.json() })
      .then(data => {
         if (data.Response == "True")  {
			
            if (nPage == 1) {
               this.setState({oSearchMovies: data.Search, nSearchResults: data.totalResults}) 
		    }
		    else {
		       this.setState(prevState => ({
			      oSearchMovies: [...prevState.oSearchMovies, ...data.Search], nSearchResults: data.totalResults
			   }))
		    }
		        
		    this.searchMoviesForPage(sSearch, nPage +1)
         }
      })
   }
   
   onSelectSearchMovieItem = (oMovieItem) => {
      fetch(URL_FECTH_MOVIE + oMovieItem.imdbID)
      .then(response => { return response.json() })
      .then(data => {
         this.setState({oSelectedMovie: data});
         this.props.navigation.navigate('MovieDetails', { oSelectedMovie: this.state.oSelectedMovie });
      })
   }
   
   renderSearchMovieItem = (oSearchMovieItem) => <SearchMovieItem {...oSearchMovieItem.item} onSelect={this.onSelectSearchMovieItem} />
   
   render() {
      return (
         <View style={oStyles.container}>
            <SearchMoviesForm onSubmit={this.onSubmitSearchMoviesForm} />
            <Text style={oStyles.results}>{'[ ' + this.state.nSearchResults + ' Items found ]'}</Text>
            <FlatList renderItem={this.renderSearchMovieItem} data={this.state.oSearchMovies} />
         </View>
      );
   }
}

const oStyles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 5
   },
   results: {
      textAlign: 'right',
      marginRight: 20 
   }
});