import React from 'react';
import { StyleSheet, Picker, Text, View } from 'react-native';
import { connect } from 'react-redux';

class SettingsForm extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <View>
            <View style={oStyles.formElement}>
            <Text style={oStyles.formElementText}>Num. Questions:</Text>
            <Picker
               style={oStyles.formElementValue}
               enabled={this.props.settings.enabled}
               selectedValue={this.props.settings.num_questions}
               onValueChange={(sItemValue, nItemIndex) =>
                  this.props.onSelectNumQuestions(sItemValue)
               }>
               {this.props.settings.num_questions_values.map((oItem) => (
                  <Picker.Item label={oItem} value={oItem} />
               ))}
            </Picker>
         </View>

         <View style={oStyles.formElement}>
            <Text style={oStyles.formElementText}>Type Questions:</Text>
            <Picker
               style={oStyles.formElementValue}
               enabled={this.props.settings.enabled}
               selectedValue={this.props.settings.type_questions}
               onValueChange={(sItemValue, nItemIndex) =>
                  this.props.onSelectTypeQuestions(sItemValue)
               }>
               {this.props.settings.type_questions_values.map((oItem) => (
                  <Picker.Item label={oItem.name} value={oItem.value} />
               ))}
            </Picker>
         </View>
      </View>
    );
  }
}

const oStyles = StyleSheet.create({
   formElement: {
      marginBottom: 20,
   },
   formElementText: {
     fontWeight: 'bold',
     marginBottom: 5,
     marginHorizontal: 20,
     color: 'white'
   },
   formElementValue: {
      marginHorizontal: 20,
      padding: 5
   }
});

const mapStateToProps = (state) => ({
   settings: state.settings,
});

export default connect(mapStateToProps, null)(SettingsForm);