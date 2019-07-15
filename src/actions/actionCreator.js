import { ADD_DATA } from './index';

export const addData = (data) =>{
    return{
        type: ADD_DATA,
        payload:{
            data
        }
    }
}