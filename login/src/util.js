import * as R from 'ramda'

export let or = (...f) => (value) => f.reduce((acc, curr) => acc || curr(value), false);

export let and = (...f) => (value) => f.reduce((acc, curr) => acc && curr(value), true);

//Check if a value is blank (null or empty)
export let isBlank = or(R.isNil, R.isEmpty);

export let isNotBlank = (value) => !isBlank(value);

//Check Regex Match
export let isMatch = (regex) => (value) => regex.test(value);

export let isNotMatch = (regex) => (value) => !regex.test(value);
