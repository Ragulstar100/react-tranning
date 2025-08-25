import { useEffect, useRef, useState } from "react";


export default function SplashScreen({children}){
const [time,setTime] = useState(0)
  useEffect(() => {
    //Dont use t++ use t+1 reson onUpdate
  const interval=setInterval(() => setTime((t) =>t+1), 1000)

    return ()=> clearInterval(interval)
           
  }, [])


  if(time>10){
  
    return <>{children}</>
  }


  return (
    <>
      <div className={`w-700  h-100 p-25 rounded-3xl shadow-2xl transfrom transition-transform duration-5000 ease-in-out ${time<1 ? 'scale-100' : 'scale-25 origin-top-left'}`}>
        <p className='text-8xl'>Welcome For All</p>
        <p className={`text-7xl pt-10 transfrom transition-all delay-0 duration-5000 ease-in-out ${time<5 ? 'opacity-0' : 'opacity-100'}`}>I am Ragul</p>
      </div>

    </>
  )

  
     

    

}
