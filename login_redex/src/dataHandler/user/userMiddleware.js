import { debounceByKey } from '../../ramadaFunctions';
import { FIELD_VALIDATION_RULES,fieldValidator} from '../validater/fieldValidationRules';
import { restrict,validate as setError } from './userMainSlice';
import * as R  from 'ramda'

const PRE_RULES = {
    ["user/setUsername"] : {  types: [FIELD_VALIDATION_RULES.isLengthMax20.type,FIELD_VALIDATION_RULES.isAlphaNumericWith_.type], shouldBlock: true },
    ["user/setPassword"]: {  types: FIELD_VALIDATION_RULES.isLengthMax10.type, shouldBlock: true }
  };
  
  const POST_RULES = {
    ["user/setUsername"]: {  types: [FIELD_VALIDATION_RULES.isAlphaNumericWith_1.type, FIELD_VALIDATION_RULES.isNotEmpty.type], shouldBlock: false },
    ["user/setPassword"]: {  types: FIELD_VALIDATION_RULES.isNotEmpty.type,shouldBlock: false }
  };



  const errorDelay =(store,blocks)=>{

          let emp=Object.values(blocks).filter((e)=>e).length==0

          if(emp){
            store.dispatch(setError(blocks));
          }else{
            console.log(emp)
            debounceByKey((_blocks)=>{  
            store.dispatch(setError(_blocks)); 
            },2000)("emptyDelay",blocks)
          }
  }


  export const runUserValidation = (store,payload,type, {  types, shouldBlock }) => {
    const validate = fieldValidator({ payload: payload, type: types });
    

    if(shouldBlock){
      const blocks = { ...store.getState().user.block, [type]: validate };
      store.dispatch(restrict(blocks));
    }else{
       const blocks = { ...store.getState().user.error, [type]: validate };
       errorDelay(store,blocks)
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
  






