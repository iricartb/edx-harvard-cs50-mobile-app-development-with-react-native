import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { updateSettingsState } from '../redux/actions';
import { connect } from 'react-redux';

class GameScoreScreen extends React.Component {
   static navigationOptions = {
      headerTitle: 'CS50 - TRIVIAL - SCORE'
   }
   
   constructor(props) {
      super(props);
   }

   componentDidMount() {
      setTimeout(() => { this.props.updateSettingsState({enabled: true}); this.props.navigation.navigate('GameMain'); }, 3000);
   }
   
   render() {
      return (
         <View style={oStyles.container}>
        <Text style={oStyles.score}>{'SCORE: ' + this.props.game.score}</Text>
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
   score: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
      paddingTop: 10
   }
});

const mapStateToProps = state => ({
   game: state.game
});

export default connect(mapStateToProps, { updateSettingsState: updateSettingsState })(GameScoreScreen)