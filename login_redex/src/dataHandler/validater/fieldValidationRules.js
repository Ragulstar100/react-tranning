import { isNotBlank,isMatch,isNotMatch,andFunction,orFunction } from '../../projectModule/ramadaFunctions';

const userNameRegex = /^[A-Za-z0-9]*(_[A-Za-z0-9]+)*$/;
const userNameRegex1 = /^[A-Za-z0-9]*(_[A-Za-z0-9]+)*_$/;


export const FIELD_VALIDATION_RULES = {
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

export function fieldValidator({ payload, type }) {
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