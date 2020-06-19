import React from 'react';
import { Button, KeyboardAvoidingView, TextInput, StyleSheet, Text, View } from 'react-native';

const TEXT_INPUT_SEARCH_MIN_LENGTH = 3;
const TEXT_INPUT_SEARCH_MAX_LENGTH = 50;

class SearchMoviesForm extends React.Component {
    
   constructor(props) {
      super(props);
      
      this.state = {
         sTextInputSearch: '',
         bIsFormValid: false
      }
   }
   
   componentDidUpdate(prevProps, prevState) {
      if (this.state.sTextInputSearch !== prevState.sTextInputSearch) {
         this.validateForm()
      }
   }
   
   onChangeInputSearch = (sTextInputSearch) => {
      if (sTextInputSearch.length <= TEXT_INPUT_SEARCH_MAX_LENGTH) {
         this.setState({sTextInputSearch})
      }
   }
   
   validateForm = () => {
      if ((this.state.sTextInputSearch.length >= TEXT_INPUT_SEARCH_MIN_LENGTH) && (this.state.sTextInputSearch.length <= TEXT_INPUT_SEARCH_MAX_LENGTH)) {
         this.setState({bIsFormValid: true})
      }       
      else {
         this.setState({bIsFormValid: false})
      }
   }
   
   onSubmit = () => {
      this.props.onSubmit(this.state)
   }
   
   render() {
      return (
         <KeyboardAvoidingView behavior="padding">
            <TextInput style={oStyles.input} value={this.state.sTextInputSearch} onChangeText={this.onChangeInputSearch} placeholder="< Movie to search ... >" />
            <View style={oStyles.button}>
               <Button title="Search" onPress={this.onSubmit} disabled={!this.state.bIsFormValid} />
            </View>
         </KeyboardAvoidingView>
      );
   }
}

const oStyles = StyleSheet.create({
   input: {
      borderWidth: 1,
      borderColor: 'black',
      minWidth: 100,
      marginTop: 20,
      marginBottom: 10,
      marginHorizontal: 20,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 3
   },
   button: {
      marginBottom: 10,
      marginHorizontal: 20,
   }
});

export default SearchMoviesForm