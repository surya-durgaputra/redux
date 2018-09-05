//import C from './constants'
//import appReducer from './store/reducers'
//import initialState from './initialState.json'
//import {createStore} from 'redux'

import storeFactory from './store' //this will import ./store/index.js
import {addDay, removeDay, setGoal, addError, clearError, clearSuggestions, changeSuggestions, randomGoals, suggestResortNames} from './store/actions'

const initialState =  localStorage['redux-store'] ? 
                        JSON.parse(localStorage['redux-store']) : {}
const saveState = () => {
    const state = JSON.stringify(store.getState())
    localStorage['redux-store'] = state
}

const store = storeFactory(initialState)

store.subscribe(saveState)
store.subscribe(()=>console.log(JSON.stringify(store.getState())))
//so now we have a store that will load its initial state from a localStorage
//and everytime we dispatch an action, it will sava that state
//plus the store has middleware associated with it that will log consoleGroups 
//for each action that is being dispatched

//below are action creators called from dispatch
store.dispatch(
    addDay("Heavenly", "2016-12-22")
)

store.dispatch(
    setGoal(13)
)

store.dispatch(
    addError("something went wrong")
)

store.dispatch(
    removeDay("2016-12-22")
)

store.dispatch(
    clearError(0)
)


store.dispatch(
    changeSuggestions(["Mt Tallac", "Mt Hood", "Mt Shasta"])
)
store.dispatch(
    clearSuggestions()
)


store.dispatch(
    suggestResortNames("hea")
)
// store.dispatch({
//     type:C.ADD_DAY,
//     payload: {
//         "resort": "Mt Shasta",
//         "date": "2018-1-12",
//         "powder": false,
//         "backcountry": true
//     }
// })

// store.dispatch({
//     type:C.ADD_DAY,
//     payload: {
//         "resort": "Squaw Valley",
//         "date": "2018-1-13",
//         "powder": true,
//         "backcountry": false
//     }
// })

// store.dispatch({
//     type:C.ADD_DAY,
//     payload: {
//         "resort": "The Canyons",
//         "date": "2018-1-14",
//         "powder": true,
//         "backcountry": true
//     }
// })
/*
const store = createStore(appReducer, initialState)

store.subscribe(()=>console.log(JSON.stringify(store.getState())))


store.subscribe(()=>{
    localStorage['redux-store'] = JSON.stringify(store.getState())    
})
// console.log('initial state', JSON.stringify(store.getState()))

store.dispatch({
    type: C.ADD_DAY,
    payload: {
        "resort": "Mt Shasta",
        "date": "2018-1-12",
        "powder": false,
        "backcountry": true
    }
})
*/

// console.log('current state', JSON.stringify(store.getState()))

// let state = initialState
// const state = null
// const action = {
//     type:C.ADD_DAY,
//     payload: {
//         "resort": "Heavenly",
//         "date": "2018-1-12",
//         "powder": true,
//         "backcountry": false
//     }
// }
// const state = [
//     "user not authorized",
//     "server feed not found"
// ]

    // const state = [
    //     {
    //         "resort": "Kirkwood",
    //         "date": "2018-12-15",
    //         "powder": true,
    //         "backcountry": false
    //     },
    //     {
    //         "resort": "Snowbird",
    //         "date": "2018-12-14",
    //         "powder": true,
    //         "backcountry": false
    //     }
    // ]
    

// const action = {
//     type: C.ADD_ERROR,
//     payload: "cannot connect to server"
// }
// const action = {
//     type: C.REMOVE_DAY,
//     payload: "2018-12-15"
// }
// const action = {
//     type: C.ADD_DAY,
//     payload: {
//         "resort": "Boreal",
//         "date": "2018-12-15",
//         "powder": false,
//         "backcountry": false
//     }
// }
// console.log(`
//     initial state = ${JSON.stringify(state)}
// `)
// state = appReducer(state, {
//     type: C.SET_GOAL,
//     payload: 2
// })
// state = appReducer(state, {
//     type: C.ADD_DAY,
//     payload: {
//         "resort": " Mt Shasta",
//         "date":"2018-10-28",
//         "powder": false,
//         "backcountry": true
//     }
// })
// state = appReducer(state, {
//     type: C.CHANGE_SUGGESTIONS,
//     payload: ["Mt Tallac", "Mt Hood", "Mt Shasta"]
// })
// // const nextState = allSkiDays(state,action)


// console.log(`
//     final state = ${JSON.stringify(state)}
// `)
