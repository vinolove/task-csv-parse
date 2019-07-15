import  { ADD_DATA } from '../actions'

export const addDataReducer = (state = { parsedData: [] }, action ) =>{
    switch (action.type){
        case ADD_DATA :
          return {...state, parsedData: action.payload.data}
        
        default:
          return state
    }
}