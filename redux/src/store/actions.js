import C from './constants'
import { suggestions } from './reducers';
import fetch from 'isomorphic-fetch'
// ----------ACTION CREATORS -------------
//create thunk
//thunks are functions. We call them just like we do other action creators. The
//difference is that thunks return function instead of an object. This returned function
//gets the store's dispatch method and the getState method. So in this higher
//order function, we have information over state and control when dispatch 
// gets executed. Additionally, thunks get the getState method, so we can check the state
//before dispatching an action.

//so this thunk will not fetch if we are already fetching
//if we are not fetching, it will start fetching, wait for 1.5 seconds
// and then cancel the fetching. Thus from one thunk, we have dispatched two 
//actions.. fetching-action and cancel-fetching action.
export const randomGoals = () => (dispatch, getState) =>{
    if(!getState().resortNames.fetching){
        dispatch({
            type:C.FETCH_RESORT_NAMES
        })

        //here we have an example of delayed dispatch.
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
// the suggestResortNames function takes in value and returns a function.
//this returned function takes in dispatch and getState (because its a thunk), 
//but since I only want to use the dispatch, we dont use the getState. So the suggestResortnames
//takes in a value and returns a function and that function gets the dispatch method
//injected as an argument. 
export const suggestResortNames = value => dispatch =>{
    //we have some latency in fetching to deal with
    //so we will first change the fetching from false to true
    //this tells our state that we are currently in the process of fetching resort names.
    dispatch({
        type:C.FETCH_RESORT_NAMES
    })

    //here we use isomorphic-fetch to make a request from the suggestion server
    //isomorphi-fetch returns a promise. That means we can wait for an asynchronous response.
    //Using a then function, we can wire up a handler that will handle the response when it 
    //occurs. So when we get a response, that response will be passed back to us in a 
    //callback function sent to the then function. I will first parse this response as json and then return that response.
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

// non-thunk action-creators

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

