import { TextField } from "../common_components/textField"
import * as R from 'ramda'

export function ProjectTextField1({value,onChange,label,placeholder,inlineValidation,inlineRestrtiction,autoFocus,blockCutCopy,blockPaste,type='text',trailingIcon,leadingIcon}){
  return (
    <TextField
      value={value}
      onChange={onChange}
      label={label}
      placeholder={placeholder}
      supportText={<>
           {inlineValidation(value)&&<p>{inlineValidation&&R.isNotNil(inlineValidation(value))?inlineValidation(value):"Empty Validation Function"}</p>}
           <p>{inlineRestrtiction&&R.isNotNil(inlineRestrtiction(value))?inlineRestrtiction(value):"Empty Validation Function"}</p>
      </>}
      type={type}
      blockCutCopy={blockCutCopy}
      blockPaste={blockPaste}
      autoFocus={autoFocus}
      trailingIcon={trailingIcon}
      leadingIcon={leadingIcon}
    />
  )

}