import React from 'react';
import { Picker, StyleSheet, View } from 'react-native';
import Count from './components/Count';

const COUNT_WORK_TITLE = 'WORKING TIME ...';
const COUNT_BREAK_TITLE = 'BREAKING TIME ...';
const COUNT_WORK_DESCRIPTION = 'Now! is the time to work very hard! :(';
const COUNT_BREAK_DESCRIPTION = 'Now! is the time to take a break! :)';
const COUNT_WORK_TIME = 1;
const COUNT_BREAK_TIME = 1;
const COUNT_WORK_BACKGROUNDCOLOR = 'green';
const COUNT_BREAK_BACKGROUNDCOLOR = 'red';

let oArrayCountTimeMinutes = [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25 ];

export default class App extends React.Component {
   
   constructor(props) {
      super(props);
      
      this.state = {
         sCountWorkTitle: COUNT_WORK_TITLE,
         sCountBreakTitle: COUNT_BREAK_TITLE,
         sCountWorkDescription: COUNT_WORK_DESCRIPTION,
         sCountBreakDescription: COUNT_BREAK_DESCRIPTION,
         nCountWorkTime: COUNT_WORK_TIME,
         nCountBreakTime: COUNT_BREAK_TIME,
         sCountWorkBackgroundColor: COUNT_WORK_BACKGROUNDCOLOR,
         sCountBreakBackgroundColor: COUNT_BREAK_BACKGROUNDCOLOR
      }
      
      this.onSetWorkTime = this.onSetWorkTime.bind(this);
      this.onSetBreakTime = this.onSetBreakTime.bind(this);
   }
   
   onSetWorkTime(sItemValue) {
      this.setTime(sItemValue, this.state.nCountBreakTime);
   }
   
   onSetBreakTime(sItemValue) {
      this.setTime(this.state.nCountWorkTime, sItemValue);
   }
   
   setTime(nWorkTime, nBreakTime) {
      this.setState((oPrevState) => ({
         sCountWorkTitle: oPrevState.sCountWorkTitle,
         sCountBreakTitle: oPrevState.sCountBreakTitle,
         sCountWorkDescription: oPrevState.sCountWorkDescription,
         sCountBreakDescription: oPrevState.sCountBreakDescription,
         nCountWorkTime: nWorkTime,
         nCountBreakTime: nBreakTime,
         sCountWorkBackgroundColor: oPrevState.sCountWorkBackgroundColor,
         sCountBreakBackgroundColor: oPrevState.sCountBreakBackgroundColor
      }));
   }
   
   render() {
      return (
         <View style={oStyles.appContainer}>
            <Count workTitle={this.state.sCountWorkTitle} breakTitle={this.state.sCountBreakTitle} workDescription={this.state.sCountWorkDescription} breakDescription={this.state.sCountBreakDescription} workTime={this.state.nCountWorkTime} breakTime={this.state.nCountBreakTime} workBackgroundColor={this.state.sCountWorkBackgroundColor} breakBackgroundColor={this.state.sCountBreakBackgroundColor} />
            <View style={oStyles.appSeparator} />
            <AppSettings workTime={this.state.nWorkTime} breakTime={this.state.nBreakTime} onSetWorkTime={this.onSetWorkTime} onSetBreakTime={this.onSetBreakTime} />
         </View>
      );
   }
}

const AppSettings = (props) => (
   <View style={oStyles.appSettings}>
      <View style={oStyles.appSetting}>
         WORK TIMER (min):&nbsp;
         <Picker selectedValue={props.workTime} onValueChange={(sItemValue, nItemIndex) => props.onSetWorkTime(sItemValue)}>
            {oArrayCountTimeMinutes.map((oItem) => (
               <Picker.Item label={oItem} value={oItem} />
            ))};
         </Picker>
      </View>
      <View style={oStyles.appSetting}>
         BREAK TIMER (min):&nbsp;
         <Picker selectedValue={props.breakTime} onValueChange={(sItemValue, nItemIndex) => props.onSetBreakTime(sItemValue)}>
            {oArrayCountTimeMinutes.map((oItem) => (
               <Picker.Item label={oItem} value={oItem} />
            ))};
         </Picker>
      </View>
   </View>
)

const oStyles = StyleSheet.create({
   appContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   appSeparator: {
      width: '400px',
      marginTop: '20px',
      marginBottom: '20px',
      border: '1px solid white'
   },
   appSettings: {
      fontSize: '13px',
      color: 'white'
   },
   appSetting: {
      marginBottom: '10px'
   }
});