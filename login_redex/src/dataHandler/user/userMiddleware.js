import { FIELD_VALIDATION_RULES,fieldValidator} from '../validater/fieldValidationRules';
import { restrict,validate as setError } from './userMainSlice';
import { allUndefined, debounceFunction } from '../../ramadaFunctions';
import { userNotValid } from './userCrossFieldValidation';

export var invalidUser=userNotValid({})

const PRE_RULES = {
    ["user/setUsername"] : {  types: [FIELD_VALIDATION_RULES.isLengthMax20.type,FIELD_VALIDATION_RULES.isAlphaNumericWith_.type], shouldBlock: true },
    ["user/setPassword"]: {  types: FIELD_VALIDATION_RULES.isLengthMax10.type, shouldBlock: true }
  };
  
  const POST_RULES = {
    ["user/setUsername"]: {  types: [FIELD_VALIDATION_RULES.isAlphaNumericWith_1.type, FIELD_VALIDATION_RULES.isNotEmpty.type], shouldBlock: false },
    ["user/setPassword"]: {  types: FIELD_VALIDATION_RULES.isNotEmpty.type,shouldBlock: false }
  };

  const errorDebounce = debounceFunction((store,blocks)=>{
    store.dispatch(setError(blocks))
  }, 500)


   
  export const runUserValidation = (store,payload,type, {  types, shouldBlock }) => {
    const validate = fieldValidator({ payload: payload, type: types });

    
    if(shouldBlock){
      const blocks = { ...store.getState().user.block, [type]: validate };
      store.dispatch(restrict(blocks));
    }else{
      const blocks = { ...store.getState().user.error, [type]: validate };
      invalidUser=userNotValid(blocks)
      errorDebounce(store,blocks)
      if(!validate){
        store.dispatch(setError(blocks))
      }
      
      return true
    }

    return !validate;
  };


  

  export const userPreProcessMiddleWare = store => next => action => {
    const rule = PRE_RULES[action.type];
    if (rule) {

      const proceed = runUserValidation(store, action.payload,action.type, rule);
      if (proceed) next(action);
    } else {
      next(action);
    }
    
  };
  

  export const userPostProcessMiddleWare = store => next => action => {
    const rule = POST_RULES[action.type];
    if (rule) runUserValidation(store, action.payload,action.type, rule);
    return next(action);
  };
  






