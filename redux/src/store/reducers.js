import C from './constants'
import {combineReducers} from 'redux'

export const goal = (state=10, action) =>
    action.type===C.SET_GOAL ? 
    parseInt(action.payload) :
    state

export const skiDay = (state=null, action) => 
    action.type===C.ADD_DAY ?
    action.payload :
    state

export const allSkiDays = (state=[], action) => {
    switch(action.type){
        case C.ADD_DAY: 
            const hasDayAlready = state.some(item=>item.date === action.payload.date)  
            return hasDayAlready ? 
                    state :
                     [...state,skiDay(null,action)]
        case C.REMOVE_DAY: 
            return state.filter(item=>item.date !== action.payload)
        default: 
            return state
    }
}
    

export const errors = (state=[], action) => { 
    switch(action.type){
        case C.ADD_ERROR:
            return [
                ...state,
                action.payload
            ]
        case C.CLEAR_ERROR:
            return state.filter((message,i)=>action.payload!==i)
        default:
            return state
    }
}

export const fetching = (state=false, action) =>{
    switch(action.type){
        case C.FETCH_RESORT_NAMES:
            return true
        case C.CANCEL_FETCHING:
            return false
        case C.CHANGE_SUGGESTIONS:
            return false
        default:
            return state
    }
}

export const suggestions = (state=[], action) =>{
    switch(action.type){
        case C.CLEAR_SUGGESTIONS:
            return []
        case C.CHANGE_SUGGESTIONS:
            return action.payload
        default:
            return state
    }
}

// const resortNames = combineReducers({
//     fetching,
//     suggestions
// })
// const singleReducer = combineReducers({
//     allSkiDays,
//     goal,
//     errors,
//     resortNames
// })

export default combineReducers({
    allSkiDays,
    goal,
    errors,
    resortNames: combineReducers({
        fetching,
        suggestions
    })
})