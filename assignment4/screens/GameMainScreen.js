import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { updateGameNumQuestion, updateGameScore, updateApiData, updateSettingsState } from '../redux/actions';
import { connect } from 'react-redux';

class GameMainScreen extends React.Component {
   static navigationOptions = {
      headerTitle: 'CS50 - TRIVIAL - OPENTDB API REST'
   }
   
   constructor(props) {
      super(props);
   }
   
   onNewGame = () => {
      this.props.updateGameNumQuestion({ num_question: 1 });
      this.props.updateGameScore({ score: 0 });
      
      fetch(this.props.data.api_url + this.props.settings.num_questions + '&category=' + this.props.settings.type_questions)
      .then(response => { return response.json() })
      .then(data => {
         this.props.updateApiData(data);
         this.props.updateSettingsState({enabled: false});

         this.props.navigation.navigate('GamePlay');
      })
   }
   
   render() {
      return (
         <View style={oStyles.container}>
            <Text style={oStyles.title}>{this.props.data.title}</Text>
            <Text style={oStyles.description}>{this.props.data.description}</Text>
            <View style={oStyles.button}>
               <Button title="New Game" onPress={this.onNewGame} />
            </View>
         </View>
      );
   }
}

const oStyles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'orange',
      paddingTop: 5
   },
   title: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16
   },
   description: {
      color: 'white',
      padding: 10,
      marginHorizontal: 10,
      marginBottom: 10,
      fontSize: 14
   },
   button: {
      marginHorizontal: 20,
   }
});

const mapStateToProps = state => ({
   settings: state.settings,
   data: state.data
});

export default connect(mapStateToProps, { updateGameNumQuestion: updateGameNumQuestion, updateGameScore: updateGameScore, updateApiData: updateApiData, updateSettingsState: updateSettingsState })(GameMainScreen)