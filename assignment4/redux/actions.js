export const UPDATE_SETTINGS_NUM_QUESTIONS = 'UPDATE_SETTINGS_NUM_QUESTIONS';
export const UPDATE_SETTINGS_TYPE_QUESTIONS = 'UPDATE_SETTINGS_TYPE_QUESTIONS';
export const UPDATE_SETTINGS_STATE = 'UPDATE_SETTINGS_STATE';
export const UPDATE_GAME_NUM_QUESTION = 'UPDATE_GAME_NUM_QUESTION';
export const UPDATE_GAME_SCORE = 'UPDATE_GAME_SCORE';
export const UPDATE_API_DATA = 'UPDATE_API_DATA';

export const updateSettingsNumQuestions = update => ({
   type: UPDATE_SETTINGS_NUM_QUESTIONS,
   payload: update
})

export const updateSettingsTypeQuestions = update => ({
   type: UPDATE_SETTINGS_TYPE_QUESTIONS,
   payload: update
})

export const updateSettingsState = update => ({
   type: UPDATE_SETTINGS_STATE,
   payload: update
})

export const updateGameNumQuestion = update => ({
   type: UPDATE_GAME_NUM_QUESTION,
   payload: update
})

export const updateGameScore = update => ({
   type: UPDATE_GAME_SCORE,
   payload: update
})

export const updateApiData = update => ({
   type: UPDATE_API_DATA,
   payload: update
})