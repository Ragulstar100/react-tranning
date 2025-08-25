import { useEffect,useRef } from "react"

export default function RFocusTrap({children}){

    const containerRef=useRef(null)

    useEffect(()=>{
    const container = containerRef.current;
    if (container) {

        //Allowed Container Elements
       let elementsFocusable= Array.from(container.querySelectorAll( 'input, button, select, textarea, a[href], [tabindex]:not([tabindex="-1"])' )).filter(el => !el.disabled && el.tabIndex >= 0);
        let focusIndex=0
    function focusChange(isForword){
            
                
            if(elementsFocusable.length==0){
               
                return null
            }
         
            return ()=>{
                focusIndex=isForword?focusIndex+1:focusIndex-1
                console.log(focusIndex)
                elementsFocusable[focusIndex%elementsFocusable.length].focus()
            }
        }
       
    
      container.addEventListener("keydown",(event)=>{
        
        if(event.key=="Tab"){
           if(focusChange()) focusChange(true)()
        }

      });
    }

    },[containerRef.current])




    return <div ref={containerRef}>
        {children}
        </div>
}
