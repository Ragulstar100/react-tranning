import { allUndefined, isBlank} from '../../ramadaFunctions';
import * as R from 'ramda'



export function userEmpty(){
    return isBlank(this.userName)&&isBlank(this.password)
 }
 
 export function userNotValid(error){

 
   
      function inner(user){
        
         
        return !allUndefined(error)||!(user.userName&&user.password)
      }

      return inner
 }