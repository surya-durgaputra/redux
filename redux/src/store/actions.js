import C from './constants'
import { suggestions } from './reducers';
import fetch from 'isomorphic-fetch'

export function addDay(resort, date, powder=false, backcountry=false){

    return {
        type:C.ADD_DAY,
        payload: {
            resort,
            date,
            powder,
            backcountry
        }
    }
}

export const removeDay = function(date){

    return {
        type:C.REMOVE_DAY,
        payload: date
    }
}

export const setGoal = goal => (
    {
        type:C.SET_GOAL,
        payload: goal
    }
)

export const addError = error => (
    {
        type:C.ADD_ERROR,
        payload: error
    }
)

export const clearError = index => (
    {
        type:C.CLEAR_ERROR,
        payload: index
    }
)

export const changeSuggestions = suggestions => (
    {
        type:C.CHANGE_SUGGESTIONS,
        payload: suggestions
    }
)

export const clearSuggestions = () => (
    {
        type:C.CLEAR_SUGGESTIONS,
        payload:""
    }
)

//create thunk
//thunks are functions. We call them just like we do other action creators. The
//difference is that thunks return function instead of an object. This function
//gets the store's dispatch method and the getState method. So in this higher
//order function, we have information over state and control when dispatch 
// gets executed
export const randomGoals = () => (dispatch, getState) =>{
    if(!getState().resortNames.fetching){
        dispatch({
            type:C.FETCH_RESORT_NAMES
        })

        setTimeout(()=>{
            dispatch({
                type:C.CANCEL_FETCHING
            }) 
        },1500)
    }
    
    //alongside calling dispatch as many times I like in a thunk, I can also 
    //delay a dispatch or do a conditional dispatch
    //so, since thunks get the dispatch method, I can call dispatch as many times,
    //and whenever I want
    //additionally, thunks get the getState method. So we can check existing state 
    //before dispatching action
    //THUNKS ALLOW US TO WRITE ROBUST ACTION CREATORS THAT ARE ASYNCHRONOUS
}

export const suggestResortNames = value => dispatch =>{
    dispatch({
        type:C.FETCH_RESORT_NAMES
    })

    fetch("http://localhost:3333/resorts/"+value)
        .then(response => response.json())
        .then(suggestions => dispatch({
                type:C.CHANGE_SUGGESTIONS,
                payload: suggestions
            })
        )
        .catch(error=>{
            dispatch(
                addError(error.message)
            )
            dispatch({
                type:C.CANCEL_FETCHING
            })
    })
}