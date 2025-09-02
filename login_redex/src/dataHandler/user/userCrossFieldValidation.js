import { isBlank} from '../../ramadaFunctions';
import * as R from 'ramda'

export function userEmpty(){
    return isBlank(this.userName)&&isBlank(this.password)
 }
 
 export function userNotValid(){
    return R.isNotEmpty(this.error)||!(this.userName&&this.password)
 }