import { createSlice } from "@reduxjs/toolkit";
import *  as R from "ramda";
import { intialUserState } from "../user/userMainSlice";

const intialField={
    value:undefined,
}


export function fieldLevelValidationConfig(initialState){
    
   return createSlice({
    name:'fieldLevelValidation',
    initialState:initialState,
    reducers:{
        isEmpty:(state,action)=>{
            R.isEmpty(action.payload)   
        }
    }
    }).reducer
}


export function templeteValidationConfig(initialState){
    
    return ({
     name:undefined,
     initialState:initialState,
     reducers:{
         isEmpty:(state,action)=>{
             action.payload
         }
     }
     })
 }

// export function userValidate({payload,type}) {

//     switch(type){
//     case isEmpty:
//     if (payload!==undefined&&isBlank(payload)) {
//         return "Field Is Empty"
//     }
//     break;
//     case isAlphaNumericWith_1:
//     if (payload!==undefined&&isMatch(userNameRegex1)(payload)) {
//         return "Field Should Not End With _"
//     }
//     break;

//     default:
//         return undefined
// }


// }



// export function userRestrict({payload,type}) {

// switch(type){
// case isAlphaNumericWith_:
// if (!andFunction(isMatch(/^(?!_).*/),orFunction(isMatch(userNameRegex), isMatch(userNameRegex1)))(payload)) {
//     return "Field only Allowed AlphaNumperic With Underscore Style(Hello_World)";
// }
// break;

// case islengthmax20:
// if (payload&&payload.length > 20) {
//     return "Length Exceed Field";
// }
// break;

// case islengthmax10:
// if (payload&&payload.length > 10) {
//     return "Length Exceed Field"
// }
// break; 

// default:
// return undefined
// }

// }