import React from 'react'

export default function DaysButton({label,selected,value,setDays}) {
  return (
    <>
        {selected && <div  className='daysBtn selected' onClick={()=>setDays(value)}>{label}</div>}
        {!selected && <div className='daysBtn' onClick={()=>setDays(value)}>{label}</div>}
    </>
  )
}
