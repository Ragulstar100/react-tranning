import { isBlank,isNotBlank,isMatch,isNotMatch,andFunction,orFunction } from '../../ramadaFunctions';
import * as R from 'ramda'
import { intialUserState,setUsername,setPassword,validate as setError,restrict, clearUser } from './userMainSlice';

const userNameRegex = /^[A-Za-z0-9]*(_[A-Za-z0-9]+)*$/;
const userNameRegex1 = /^[A-Za-z0-9]*(_[A-Za-z0-9]+)*_$/;



const FIELD_VALIDATION_RULES = {
    isNotEmpty: {
        check: (payload) => payload !== undefined && isNotBlank(payload),
        message: "Field Is Empty",
        type: "isNotEmpty"
    },
    isAlphaNumericWith_: {
        check: (payload) => andFunction(isMatch(/^(?!_).*/), orFunction(isMatch(userNameRegex), isMatch(userNameRegex1)))(payload),
        message: "Field only Allowed AlphaNumeric With Underscore Style (Hello_World)",
        type: "isAlphaNumericWith_"
    },
    isAlphaNumericWith_1: {
        check: (payload) => payload !== undefined && !isMatch(userNameRegex1)(payload),
        message: "Field Should Not End With _",
        type: "isAlphaNumericWith_1"
    }
,
    isLengthMax20: {
        check: (payload) => (payload !== undefined  && payload.length < 20),
        message: "20 Length Exceed Field",
        type: "isLengthMax20"
    },

    isLengthMax10: {
        check: (payload) => (payload !== undefined  && payload.length < 10),
        message: "10 Length Exceed Field",
        type: "isLengthMax10"
    }
};

export function validator({ payload, type }) {
    // Normalize type into an array (so it works for both single + multiple)
    const types = Array.isArray(type) ? type : [type];

    for (const t of types) {
        const rule = FIELD_VALIDATION_RULES[t];
        if (rule && !rule.check(payload)) {
            return rule.message;
        }
    }

    return undefined;
}




 export function userEmpty(){
    return isBlank(this.userName)&&isBlank(this.password)
 }
 
 export function userNotValid(){
    return R.isNotEmpty(this.error)||!(this.userName&&this.password)
 }


// const [isAlphaNumericWith_,isAlphaNumericWith_1,islengthmax10,islengthmax20,isEmpty]=['isAlphaNumericWith_','isAlphaNumericWith_1','islengthmax10','islengthmax20','isEmpty']

const PRE_RULES = {
    ["user/setUsername"] : {  types: [FIELD_VALIDATION_RULES.isLengthMax20.type,FIELD_VALIDATION_RULES.isAlphaNumericWith_.type], shouldBlock: true },
    ["user/setPassword"]: {  types: FIELD_VALIDATION_RULES.isLengthMax10.type, shouldBlock: true }
  };
  
  const POST_RULES = {
    ["user/setUsername"]: {  types: [FIELD_VALIDATION_RULES.isAlphaNumericWith_1.type, FIELD_VALIDATION_RULES.isNotEmpty.type], shouldBlock: false },
    ["user/setPassword"]: {  types: FIELD_VALIDATION_RULES.isNotEmpty.type,shouldBlock: false }
  };
   

  const runValidation = (store, action, {  types, shouldBlock }) => {
    const validate = validator({ payload: action.payload, type: types });
    
    if(shouldBlock){
      const blocks = { ...store.getState().user.block, [action.type]: validate };
      store.dispatch(restrict(blocks));
    }else{
      const blocks = { ...store.getState().user.error, [action.type]: validate };
      store.dispatch(setError(blocks));
      return true
    }

    return !validate;
  };
  

  export const userPreProcessMiddleWare = store => next => action => {
    const rule = PRE_RULES[action.type];
    if (rule) {

      const proceed = runValidation(store, action, rule);
      if (proceed) next(action);
    } else {
      next(action);
    }
    
  };
  

  export const userPostProcessMiddleWare = store => next => action => {
    const rule = POST_RULES[action.type];
    if (rule) runValidation(store, action, rule);
    return next(action);
  };
  






