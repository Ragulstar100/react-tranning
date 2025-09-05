import * as R from 'ramda'

export let orFunction = (...f) => (value) => f.reduce((acc, curr) => acc || curr(value), false);

export let andFunction = (...f) => (value) => f.reduce((acc, curr) => acc && curr(value), true);

//Check if a value is blank (null or empty)
export let isBlank = orFunction(R.isNil, R.isEmpty);

export let isNotBlank = (value) => !isBlank(value);

//Check Regex Match
export let isMatch = (regex) => (value) => regex.test(value);

export let isNotMatch = (regex) => (value) => !regex.test(value);

export let isZero= (value)=> value=='0' 

export let isNegative= (value)=> value<0

export let isPostive= (value)=>value>0

export const allUndefined = (obj) => R.all(R.isNil, R.values(obj));


export let debounceFunction = (func, delay) => {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}
