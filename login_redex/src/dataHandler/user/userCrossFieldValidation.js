import { allUndefined, isBlank} from '../../commonModule/ramadaFunctions';
import * as R from 'ramda'



export function userEmpty(){
    return isBlank(this.userName)&&isBlank(this.password)
 }
 
/* 
   This curried function is used to memoize errors from users 
   and immediately disable the submit button if an error exists, 
   without applying a debounce delay. 
*/
 export const userNotValid= (error)=>(user)=>!allUndefined(error)||!(user.userName&&user.password)
      
 