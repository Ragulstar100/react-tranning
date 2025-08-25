import * as R from 'ramda'

export let orFunction = (...f) => (value) => f.reduce((acc, curr) => acc || curr(value), false);

export let andFunction = (...f) => (value) => f.reduce((acc, curr) => acc && curr(value), true);

//Check if a value is blank (null or empty)
export let isBlank = orFunction(R.isNil, R.isEmpty);

export let isNotBlank = (value) => !isBlank(value);

//Check Regex Match
export let isMatch = (regex) => (value) => regex.test(value);

export let isNotMatch = (regex) => (value) => !regex.test(value);
