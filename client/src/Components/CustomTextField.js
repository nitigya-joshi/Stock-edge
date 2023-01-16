import React from 'react'

export default function CustomTextField({value,setValue,text,type}) {
    const handleOnChange=(e)=>{
        setValue(e.target.value)
    }
  return (
    <div className="customTextFieldContainer" >
        {value.length>0 && <span className="customTextFieldLabelLength">{text}</span>}
        {value.length==0 && <span className="customTextFieldLabel">{text}</span>}
        <input type={type} value={value} onChange={handleOnChange} className="customTextField" data-text="enter your email"/>
    </div>
    
  )
}
