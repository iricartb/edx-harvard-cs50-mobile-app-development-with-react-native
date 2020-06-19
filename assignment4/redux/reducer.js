import { combineReducers } from 'redux';
import { UPDATE_SETTINGS_NUM_QUESTIONS, UPDATE_SETTINGS_TYPE_QUESTIONS, UPDATE_SETTINGS_STATE, UPDATE_GAME_NUM_QUESTION, UPDATE_GAME_SCORE, UPDATE_API_DATA } from './actions';

const settingsReducer = (oState = { num_questions: 10, type_questions: 0, num_questions_values: [10, 20, 30, 40, 50], type_questions_values: [{ name: 'General Knowledge', value:9 }, 
                        { name: 'Entertainment: Books', value:10 },
                        { name: 'Entertainment: Film', value:11 },
                        { name: 'Entertainment: Music', value:12 },
                        { name: 'Entertainment: Musicals & Theatres', value:13 },
                        { name: 'Entertainment: Video Games', value:15 },
                        { name: 'Entertainment: Board Games', value:16 },
                        { name: 'Science & Nature', value:17 },
                        { name: 'Science: Computers', value:18 },     
                        { name: 'Science: Mathematics', value:19 },
                        { name: 'Mythology', value:20 },     
                        { name: 'Sports', value:21 },
                        { name: 'Geography', value:22 },
                        { name: 'History', value:23 },
                        { name: 'Politics', value:24 },
                        { name: 'Art', value:25 },
                        { name: 'Celebrities', value:26 },
                        { name: 'Animals', value:27 },
                        { name: 'Vehicles', value:28 },
                        { name: 'Entertainment: Comics', value:29 },   
                        { name: 'Science: Gadgets', value:30 },   
                        { name: 'Entertainment: Japanese Anime & Manga', value:31 },
                        { name: 'Entertainment: Cartoon & Animations', value:32 },                                                                             
                       ], enabled: true }, oAction) => {
   switch(oAction.type) {
      case UPDATE_SETTINGS_NUM_QUESTIONS:
         return { num_questions: oAction.payload.num_questions, type_questions: oState.type_questions, num_questions_values: oState.num_questions_values, type_questions_values: oState.type_questions_values,
enabled: oState.enabled }
  
      case UPDATE_SETTINGS_TYPE_QUESTIONS:
         return { num_questions: oState.num_questions, type_questions: oAction.payload.type_questions, num_questions_values: oState.num_questions_values, type_questions_values: oState.type_questions_values,
enabled: oState.enabled }
          
      case UPDATE_SETTINGS_STATE:
         return { num_questions: oState.num_questions, type_questions: oState.type_questions, num_questions_values: oState.num_questions_values, type_questions_values: oState.type_questions_values,
enabled: oAction.payload.enabled }

      default:
         return oState;
   }
}

const gameReducer = (oState = { num_question: 1, score: 0 }, oAction) => {
   switch(oAction.type) {
      case UPDATE_GAME_NUM_QUESTION:
         return { num_question: oAction.payload.num_question, score: oState.score }
  
      case UPDATE_GAME_SCORE:
         return { num_question: oState.num_question, score: oAction.payload.score }
         
      default:
         return oState;
   }
}

const dataReducer = (oState = { title: 'HARVARD TRIVIAL OPENTDB', description: 'Welcome to Trivial opentdb, click on the following button to start this new adventure!', api_url: 'https://opentdb.com/api.php?amount=', api_data: {} }, oAction) => {
   switch(oAction.type) {
      case UPDATE_API_DATA:
         return { title: oState.title, description: oState.description, api_url: oState.api_url, api_data: oAction.payload.results }
  
      default:
         return oState;
   }
}

const reducer = combineReducers({
   settings: settingsReducer,
   game: gameReducer,
   data: dataReducer
});

export default reducer;