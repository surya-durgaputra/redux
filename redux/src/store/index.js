//import C from '../constants'
import thunk from 'redux-thunk'
import appReducer, { fetching } from './reducers'
import {createStore, applyMiddleware} from 'redux'

//middleware needs higher order function that returns a function that returns a function
//we have created this file index.js, so that we can add middleware

//next is the function we will use to invoke or dispatch the action
// const consoleMessages = function(store){
//     return function(next){
//         return function(action){ 

//         }
//     }
// }
const consoleMessages = store => next => action => {
    let result 
    console.groupCollapsed(`dispatching action => ${action.type}`)
    console.log('ski days', store.getState().allSkiDays.length)
    result = next(action)
    let {allSkiDays, goal, errors, resortNames} = store.getState()
    console.log(`
    ski days: ${allSkiDays.length}
    goal: ${goal}
    fetching:${resortNames.fetching}
    suggestions: ${resortNames.suggestions}
    errors: ${errors.length}
    `)
    console.groupEnd()
    return result
}
export default (initialState={}) => {
    return applyMiddleware(thunk, consoleMessages)(createStore)(appReducer, initialState)
    //return createStore(appReducer, initialState)
}
