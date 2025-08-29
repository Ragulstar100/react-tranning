import { isBlank,isMatch,isNotMatch,andFunction,orFunction } from '../../ramadaFunctions';
import * as R from 'ramda'
import { intialUserState,setUsername,setPassword,validate as setError,restrict, clearUser } from './userMainSlice';


const userNameRegex = /^[A-Za-z0-9]*(_[A-Za-z0-9]+)*$/;
const userNameRegex1 = /^[A-Za-z0-9]*(_[A-Za-z0-9]+)*_$/;
const [isAlphaNumericWith_,isAlphaNumericWith_1,islengthmax10,islengthmax20,isEmpty]=['isAlphaNumericWith_','isAlphaNumericWith_1','islengthmax10','islengthmax20','isEmpty']


export const userPreProcessMiddleWare=storeApi=>next=>action=>{

    let validate
    let blocks
    switch(action.flags){
      case setUsername.type: 
         validate=(userRestrict({payload:action.payload,type:islengthmax20})||userRestrict({payload:action.payload,type:isAlphaNumericWith_}))
         blocks={...storeApi.getState().user.block,userName:validate}
         storeApi.dispatch(restrict(blocks))
         if(!validate) {
            next(action)
        }    
  
        break;

      case "pass":   
         validate=(userRestrict({payload:action.payload,type:islengthmax10}))
         blocks={...storeApi.getState().user.block,password:validate}
         storeApi.dispatch(restrict(blocks))
         if(!validate) {
            next(action)
        }  
        break;
        default:
        next(action)    

    } 

}



export const userPostProcessMiddleWare=storeApi=>next=>action=>{

    let validate
    let blocks



    switch(action.type){
      case setUsername.type: 
         validate=(userValidate({payload:action.payload,type:isAlphaNumericWith_1})||userValidate({payload:action.payload,type:isEmpty}))
         blocks={...storeApi.getState().user.error,userName:validate}
         storeApi.dispatch(setError(blocks))
        break;

      case setPassword.type:  
         validate=(userValidate({payload:action.payload,type:isEmpty}))
         blocks={...storeApi.getState().user.error,password:validate}
         storeApi.dispatch(setError(blocks))
        break;
        default:
    } 

    return next(action)

}



export function userValidate({payload,type}) {


        switch(type){
        case isEmpty:
        if (payload!==undefined&&isBlank(payload)) {
            return "Field Is Empty"
        }
        break;
        case isAlphaNumericWith_1:
        if (payload!==undefined&&isMatch(userNameRegex1)(payload)) {
            return "Field Should Not End With _"
        }
        break;

        default:
            return undefined
    }


}



export function userRestrict({payload,type}) {

    switch(type){
    case isAlphaNumericWith_:
    if (!andFunction(isMatch(/^(?!_).*/),orFunction(isMatch(userNameRegex), isMatch(userNameRegex1)))(payload)) {
        return "Field only Allowed AlphaNumperic With Underscore Style(Hello_World)";
    }
    break;
    
    case islengthmax20:
    if (payload&&payload.length > 20) {
        return "Length Exceed Field";
    }
    break;
    case islengthmax10:
    if (payload&&payload.length > 10) {
        return "Length Exceed Field"
    }
    break; 

    default:
    return undefined
}

}

 export function userEmpty(){
    return isBlank(this.userName)&&isBlank(this.password)
 }
 
 export function userNotValid(){
    return R.isNotEmpty(this.error)||!(this.userName&&this.password)
 }