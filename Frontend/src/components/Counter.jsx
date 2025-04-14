import {React,useState} from 'react';
function Counter(){
    const[counter,setCounter]=useState(0);
    useEffect(()=>{
        const interval=setInterval(()=>{
            setCounter(prev=>prev+1);
        },1000);
    },[]);

    return(
       <div>
           <h1>Counter</h1>
           <h2>Counter:{counter}</h2>
           console.log(counter);
       </div>

    );
}

export default Counter;







