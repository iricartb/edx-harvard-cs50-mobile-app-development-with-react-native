import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SettingsForm from '../components/SettingsForm';
import { updateSettingsNumQuestions, updateSettingsTypeQuestions } from '../redux/actions';
import { connect } from 'react-redux';

class GameSettingsScreen extends React.Component {
   constructor(props) {
      super(props);
   }
   
   onSelectNumQuestions = (nNumQuestions) => {
      this.props.updateSettingsNumQuestions({ num_questions: nNumQuestions });
   }
   
   onSelectTypeQuestions = (nTypeQuestions) => {
      this.props.updateSettingsTypeQuestions({ type_questions: nTypeQuestions });
   }
   
   render() {
      return (
         <View style={oStyles.container}>
            <Text style={oStyles.headerTitle}>SETTINGS</Text>
            <SettingsForm onSelectNumQuestions={this.onSelectNumQuestions} onSelectTypeQuestions={this.onSelectTypeQuestions} />
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
   headerTitle: {
      color: 'white',
      textAlign: 'center',
      paddingVertical: 20,
      fontSize: 16,
      fontWeight: 'bold'
   }
});

export default connect(null, { updateSettingsNumQuestions: updateSettingsNumQuestions, updateSettingsTypeQuestions: updateSettingsTypeQuestions })(GameSettingsScreen)