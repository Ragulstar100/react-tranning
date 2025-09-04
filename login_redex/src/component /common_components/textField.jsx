import * as R from 'ramda'


/*This TextField Create Based on Material 3 TextField Configration 
ref:https://m3.material.io/components/text-fields/specs
*/

export function TextField({value,onChange,label,placeholder,inlineValidation,inlineRestrtiction,type='text',trailingIcon,leadingIcon}){
    return <div className='textField'> 
      <label>{label}</label>
      <div className='field'>
      {leadingIcon&&<div className='leadingIcon'>{leadingIcon}</div>}
      <input type={type} onCopy={(e)=>{ if(type=='password') e.preventDefault() }} onCut={(e)=>{ if(type) e.preventDefault() }} onPaste={(e)=>{ if(type=='password') e.preventDefault() }} value={value} onChange={(e)=> {onChange(e.currentTarget.value)}} placeholder={placeholder} /> 
      {trailingIcon&&<div className='trailingIcon'>{trailingIcon}</div>}
      </div>
      {inlineValidation(value)&&<p>{inlineValidation&&R.isNotNil(inlineValidation(value))?inlineValidation(value):"Empty Validation Function"}</p>}
      <p>{inlineRestrtiction&&R.isNotNil(inlineRestrtiction(value))?inlineRestrtiction(value):"Empty Validation Function"}</p>
      </div>
  }