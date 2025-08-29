import { useState } from "react"

//Always avaible second method try after
export default function ToolTip({content,children}){

    const [show,setShow]=useState(false)
             
   return <div onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)} className="relative flex">
      {children}
      {show&&<div className="absolute bottom-full -translate-y-1 left-1/2 -translate-x-1/2">{content}</div> } 
    </div>   
}