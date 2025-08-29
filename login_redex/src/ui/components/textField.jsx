export function TextField({value,onChange,label,placeholder,inlineValidation,inlineRestrtiction,type='text'}){
    return <div className='textField'> 
      <label>{label}</label>
      <input type={type} onCopy={(e)=>{ if(type=='password') e.preventDefault() }} onCut={(e)=>{ if(type) e.preventDefault() }} onPaste={(e)=>{ if(type=='password') e.preventDefault() }} value={value} onChange={(e)=> {onChange(e.currentTarget.value)}} placeholder={placeholder} /> 
      {/* <button type="button" tabIndex={value?0:-1} disabled={!value} onClick={()=>{ onChange("")} }>X</button> */}
      <p>{inlineValidation&&R.isNotNil(inlineValidation(value))?inlineValidation(value):"Empty Validation Function"}</p>
      <p>{inlineRestrtiction&&R.isNotNil(inlineRestrtiction(value))?inlineRestrtiction(value):"Empty Validation Function"}</p>
      </div>
  }