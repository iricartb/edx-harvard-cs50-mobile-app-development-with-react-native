import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { vibrate } from '../utils';

const COUNT_RECORD_DESCRIPTION = 'Record: I\'ve changed this counter to 1m';
const COUNT_STATE_WORK = 'COUNT_STATE_WORK';
const COUNT_STATE_BREAK = 'COUNT_STATE_BREAK';

export default class Count extends React.Component {
   
   constructor(props) {
      super(props);
      
      this.state = {
         sTitle: this.props.workTitle,
         sDescripion: this.props.workDescription,
         nTime: this.props.workTime * 60,
         sBackgroundColor: this.props.workBackgroundColor,
         nCurrentState: COUNT_STATE_WORK
      }
      
      this.onCountStart = this.onCountStart.bind(this);
      this.onCountStop = this.onCountStop.bind(this);
      this.onCountReset = this.onCountReset.bind(this);
      this.onDestroyInterval = this.onDestroyInterval.bind(this);
      this.onCountDecrement = this.onCountDecrement.bind(this);
   }
   
   componentDidMount() {
      document.body.style.backgroundColor = this.state.sBackgroundColor;
   }
   
   componentWillUnmount() {
      this.onDestroyInterval();
   }
   
   componentWillReceiveProps(oNextProps) {
      if (this.state.nCurrentState == COUNT_STATE_WORK) {
         this.setState((oPrevState) => ({
            sTitle: oNextProps.workTitle,
            sDescripion: oNextProps.workDescription,
            nTime: oNextProps.workTime * 60,
            sBackgroundColor: oNextProps.workBackgroundColor
         }));
      }
      else {
         this.setState((oPrevState) => ({
            sTitle: oNextProps.breakTitle,
            sDescripion: oNextProps.breakDescription,
            nTime: oNextProps.breakTime * 60,
            sBackgroundColor: oNextProps.breakBackgroundColor
         }));
      }
      
      document.body.style.backgroundColor = this.state.sBackgroundColor;
      
      this.onDestroyInterval();   
   }
   
   onCountStart() {
      this.onDestroyInterval();
      
      this.oInterval = setInterval(this.onCountDecrement, 1000);
   }
   
   onCountStop() {
      this.onDestroyInterval();   
   }
   
   onCountReset() {
      if (this.state.nCurrentState == COUNT_STATE_WORK) {
         this.setState((oPrevState) => ({
            sTitle: oPrevState.sTitle,
            sDescripion: oPrevState.sDescripion,
            nTime: this.props.workTime * 60,
            sBackgroundColor: oPrevState.sBackgroundColor,
            nCurrentState: oPrevState.nCurrentState
         }));
      }
      else {
         this.setState((oPrevState) => ({
            sTitle: oPrevState.sTitle,
            sDescripion: oPrevState.sDescripion,
            nTime: this.props.breakTime * 60,
            sBackgroundColor: oPrevState.sBackgroundColor,
            nCurrentState: oPrevState.nCurrentState
         }));
      }
      
      document.body.style.backgroundColor = this.state.sBackgroundColor;   
               
      this.onDestroyInterval();
   }
   
   onCountDecrement() {
      if (this.state.nTime > 0) {  
         this.setState((oPrevState) => ({
            sTitle: oPrevState.sTitle,
            sDescripion: oPrevState.sDescripion,
            nTime: oPrevState.nTime - 1,
            sBackgroundColor: oPrevState.sBackgroundColor,
            nCurrentState: oPrevState.nCurrentState
         }));
         
         if (this.state.nTime < 10) {
            if ((this.state.nTime % 2) == 1) {
               document.body.style.backgroundColor = 'darkorange';
            }
            else {
               document.body.style.backgroundColor = this.state.sBackgroundColor;  
            }
         }
      }
      else {
         vibrate();

         if (this.state.nCurrentState == COUNT_STATE_WORK) {
            this.setState((oPrevState) => ({
               sTitle: this.props.breakTitle,
               sDescripion: this.props.breakDescription,
               nTime: this.props.breakTime * 60,
               sBackgroundColor: this.props.breakBackgroundColor,
               nCurrentState: COUNT_STATE_BREAK
            }));
         }
         else {
            this.setState((oPrevState) => ({
               sTitle: this.props.workTitle,
               sDescripion: this.props.workDescription,
               nTime: this.props.workTime * 60,
               sBackgroundColor: this.props.workBackgroundColor,
               nCurrentState: COUNT_STATE_WORK
            }));
         }
         
         document.body.style.backgroundColor = this.state.sBackgroundColor;
      }
   }
   
   onDestroyInterval() {
      clearInterval(this.oInterval);
   }
   
   printFormatTime() {
      return (
         Math.floor(this.state.nTime / 60) + ' min ' + (this.state.nTime % 60) + ' sec'
      );
   }
   
   render() {
      return (
         <View>
            <Text h3 style={oStyles.countTitle}>{this.state.sTitle}</Text>
            
            <Text style={oStyles.countDescription}>{COUNT_RECORD_DESCRIPTION}</Text>
            <Text style={oStyles.countDescription}>{this.state.sDescripion}</Text>

            <Text style={oStyles.countTime}>{this.printFormatTime()}</Text>
            
            <View style={oStyles.countButton}>
               <Button title="START" onPress={this.onCountStart} />
            </View>
            <View style={oStyles.countButton}>
               <Button title="STOP" onPress={this.onCountStop} />
            </View>
            <View style={oStyles.countButton}>
               <Button title="RESET" onPress={this.onCountReset} />
            </View>
         </View>
      );
   }
}

const oStyles = StyleSheet.create({
   countTitle: {
      fontSize: '24px',
      color: 'white',
      marginBottom: '5px',
   },
   countDescription: {
      color: 'white'
   },
   countButton: {
      width: '200px',
      padding: '3px'
   },
   countTime: {
      fontSize: '24px',
      color: 'white',
      marginTop: '10px',
      marginBottom: '10px'
   }
});