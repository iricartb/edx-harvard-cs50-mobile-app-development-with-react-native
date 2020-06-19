import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { updateGameNumQuestion, updateGameScore, updateApiData } from '../redux/actions';
import { connect } from 'react-redux';

const STATUS_ANSWER_NOT_SELECTED = 'STATUS_ANSWER_NOT_SELECTED';
const STATUS_ANSWER_INCORRECT = 'STATUS_ANSWER_INCORRECT';
const STATUS_ANSWER_CORRECT = 'STATUS_ANSWER_CORRECT';

class GamePlayScreen extends React.Component {
   static navigationOptions = {
      headerTitle: 'CS50 - TRIVIAL - PLAYING ...'
   }
   
   constructor(props) {
      super(props);
      
      this.onCountStart = this.onCountStart.bind(this);
      this.onCountStop = this.onCountStop.bind(this);
      this.onDestroyInterval = this.onDestroyInterval.bind(this);
      this.onCountDecrement = this.onCountDecrement.bind(this);
      this.onCheckSelectedAnswer = this.onCheckSelectedAnswer.bind(this);
      this.onSelectAnswer = this.onSelectAnswer.bind(this);
      this.getNewAnswers = this.getNewAnswers.bind(this);

      this.state = {
         nTime: 30,
         sStatusAnswer: STATUS_ANSWER_NOT_SELECTED,
         oAnswers: this.getNewAnswers()
      }
   }
   
   componentDidMount() {
      this.onCountStart();
   }
   
   componentWillUnmount() {
      this.onDestroyInterval();
   }
   
   getNewAnswers() {
      let oArrayAnswers = this.props.data.api_data[this.props.game.num_question - 1].incorrect_answers;
      oArrayAnswers = [ ...oArrayAnswers, this.props.data.api_data[this.props.game.num_question - 1].correct_answer ];
      
      oArrayAnswers = shuffleArray(oArrayAnswers);

      return oArrayAnswers;
   }

   onDestroyInterval() {
      clearInterval(this.oInterval);
   }
   
   onCountStart() {
      this.onDestroyInterval();
      
      this.oInterval = setInterval(this.onCountDecrement, 1000);
   }
   
   onCountStop() {
      this.onDestroyInterval();   
   }
  
   onCountDecrement() {
      if (this.state.nTime > 0) {  
         this.setState((oPrevState) => ({
            nTime: oPrevState.nTime - 1
         }));
      }
      else {
         this.onDestroyInterval();
         
         this.onCheckSelectedAnswer('');
      }
   }
   
   onSelectAnswer(oEvent, sSelectedAnswer) {
      this.onCheckSelectedAnswer(sSelectedAnswer);
   }
   
   onCheckSelectedAnswer(sSelectedAnswer) {
      this.onDestroyInterval();

      if (sanitizeString(sSelectedAnswer.toLowerCase()) == sanitizeString(this.props.data.api_data[this.props.game.num_question - 1].correct_answer.toLowerCase())) {
         this.setState((oPrevState) => ({
            sStatusAnswer: STATUS_ANSWER_CORRECT
         }));    
      
         this.props.updateGameScore({score: this.props.game.score + 30 + this.state.nTime});
      }
      else {
         this.setState((oPrevState) => ({
            sStatusAnswer: STATUS_ANSWER_INCORRECT
         }));   
      }
            
      if (this.props.game.num_question == this.props.settings.num_questions) {
         this.props.navigation.navigate('GameScore');
      }
      else {
        setTimeout(() => { 
           this.props.updateGameNumQuestion({num_question: this.props.game.num_question + 1});
             
       this.setState((oPrevState) => ({
             nTime: 30,
             sStatusAnswer: STATUS_ANSWER_NOT_SELECTED,
             oAnswers: this.getNewAnswers()
           }));
        
       this.onCountStart(); 
         }, 1000);
      }   
   }
   
   render() {
      return (
         <View style={oStyles.container}>
            <Text style={oStyles.toolbarQuestion}>{'QUESTION: ' + this.props.game.num_question + ' / ' + this.props.settings.num_questions}</Text>
            <Text style={oStyles.toolbarScore}>{'SCORE: ' + this.props.game.score}</Text>
            
        <Text style={oStyles.question}>{sanitizeString(this.props.data.api_data[this.props.game.num_question - 1].question)}</Text>

            <Text style={oStyles.counter}>{this.state.nTime}</Text>

            <Text style={oStyles.checker}>
               {(this.state.sStatusAnswer != STATUS_ANSWER_NOT_SELECTED) ? ((this.state.sStatusAnswer == STATUS_ANSWER_CORRECT) ? <Text style={oStyles.checkerGreen}>CORRECT!</Text> : <Text style={oStyles.checkerRed}>INCORRECT!</Text>) : <Text></Text> }
        </Text>
        
            {this.state.oAnswers.map((oItem) => (
               <View style={oStyles.button}><Button title={sanitizeString(oItem)} onPress={(oEvent) => this.onSelectAnswer(oEvent, sanitizeString(oItem))} /></View>
            ))}
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
   toolbarQuestion: {
      color: 'red',
      textAlign: 'left',
      fontSize: 11,
      fontWeight: 'bold',
      marginHorizontal: 20
   },
   toolbarScore: {
      color: 'green',
      textAlign: 'left',
      fontSize: 11,
      fontWeight: 'bold',
      marginHorizontal: 20,
      marginBottom: 10
   },
   question: {
      color: 'white',
      padding: 10,
      marginHorizontal: 10,
      fontSize: 15
   },
   counter: {
      fontSize: 22,
      textAlign: 'center',
      marginVertical: 10,
      color: 'red',
      fontWeight: 'bold'
   },
   checker: {
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
      marginHorizontal: 10
   },
   checkerGreen: {
      color: 'green'
   },
   checkerRed: {
      color: 'red'
   },
   button: {
      marginHorizontal: 20,
      marginVertical: 5
   }
});

const mapStateToProps = state => ({
   settings: state.settings,
   game: state.game,
   data: state.data
});

function shuffleArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function sanitizeString(sString) {
   return sString.replace(/&quot;/g, '\"').replace(/&#039;/g, '\'');
}

export default connect(mapStateToProps, { updateGameNumQuestion: updateGameNumQuestion, updateGameScore: updateGameScore })(GamePlayScreen)