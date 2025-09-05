import * as R from 'ramda'


/*This TextField Create Based on Material 3 TextField Configration 
ref:https://m3.material.io/components/text-fields/specs
*/



  export function TextField({value,onChange,label,placeholder,supportText,type='text',blockCutCopy=false,blockPaste,trailingIcon,leadingIcon}){
    return <div className='textField'> 
      <label>{label}</label>
      <div className='field'>
      {leadingIcon&&<div className='leadingIcon'>{leadingIcon}</div>}
      <input type={type} onCopy={(e)=>{ if(type=='password'||blockCutCopy) e.preventDefault() }} onCut={(e)=>{ if(type) e.preventDefault() }} onPaste={(e)=>{ if(blockPaste) e.preventDefault() }} value={value} onChange={(e)=> {onChange(e.currentTarget.value)}} placeholder={placeholder} /> 
      {trailingIcon&&<div className='trailingIcon'>{trailingIcon}</div>}
      </div >
      <div>
      {supportText}
      </div>
      </div>
  }  