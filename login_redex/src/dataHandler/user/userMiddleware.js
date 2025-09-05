
import { FIELD_VALIDATION_RULES,fieldValidator} from '../validater/fieldValidationRules';
import { restrict,validate as setError } from './userMainSlice';
import {  debounceFunction } from '../../projectModule/ramadaFunctions';
import { userNotValid } from './userCrossFieldValidation';

// this function used for transer ther validarion error without debounce delay
export var invalidUser=userNotValid({})


/* These variable contains rules restrict rules.
if restrict rule pass only update on state.
 but validate wheather validaton sucess or fail always update on state*/
const PRE_RULES = {
    ["user/setUsername"] : {  types: [FIELD_VALIDATION_RULES.isLengthMax20.type,FIELD_VALIDATION_RULES.isAlphaNumericWith_.type], shouldBlock: true },
    ["user/setPassword"]: {  types: FIELD_VALIDATION_RULES.isLengthMax10.type, shouldBlock: true }
  };
  
  const POST_RULES = {
    ["user/setUsername"]: {  types: [FIELD_VALIDATION_RULES.isAlphaNumericWith_1.type, FIELD_VALIDATION_RULES.isNotEmpty.type], shouldBlock: false },
    ["user/setPassword"]: {  types: FIELD_VALIDATION_RULES.isNotEmpty.type,shouldBlock: false }
  };



/* Does not show validation util user complete typeing.
Error only shows after typeing stops for 500ms 
*/
  const errorDebounce = debounceFunction((store,errors)=>{
    store.dispatch(setError(errors||{}))
  }, 500)


  /*runs All validation rules and store in state and Excicute*/
  export const runUserValidation = (store,payload,type, {  types, shouldBlock }) => {
    const validate = fieldValidator({ payload: payload, type: types });

    

    if(shouldBlock){
      const errors = { ...store.getState().user.block, [type]: validate };
      store.dispatch(restrict(errors));
    }else{
      const errors = { ...store.getState().user.error, [type]: validate };
      invalidUser=userNotValid(errors)
      errorDebounce(store,errors)
      if(!validate){
        store.dispatch(setError(errors))
      }
      
      return true
    }

    return !validate;
  };

  //before state update execution
  export const userPreProcessMiddleWare = store => next => action => {
    const rule = PRE_RULES[action.type];
    if (rule) {
      const proceed = runUserValidation(store, action.payload,action.type, rule);
      if (proceed) next(action);
    } else {
      next(action);
    }
  };


  //After state update execution
  export const userPostProcessMiddleWare = store => next => action => {
    const rule = POST_RULES[action.type];
    if (rule) runUserValidation(store, action.payload,action.type, rule);
    return next(action);
  };
  






