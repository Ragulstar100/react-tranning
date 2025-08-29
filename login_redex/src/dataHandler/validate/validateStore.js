import { configureStore } from "@reduxjs/toolkit";
import { fieldLevelValidationConfig } from "./fieldLevelValiadtionSlice";


function configValidate(initialState) {

    let intialValidateState={state:initialState,errors:{},blocks:{}};


return configureStore({
    reducer:{
             fieldLevelValidation:fieldLevelValidationConfig(intialValidateState)
           }
   })
}



export const validateStore=configValidate("")


