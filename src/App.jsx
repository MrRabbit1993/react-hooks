import React, { Component, useState,useMemo,useEffect,memo,useCallback, useRef, PureComponent} from 'react';
function App(){
  const [count,setCount] = useState(0)
  const double = useMemo(()=>{//这里可以控制是否重新计算了
    return count * 2
  },[count===3])
  const countRef = useRef()
  // let it
  let it = useRef();
  const onClick = useCallback(()=>{
    countRef.current.speak()
  },[countRef])
  useEffect(()=>{//创见一个定时器
    // it = setInterval(()=>{
    //     setCount(count=>count+1)
    // },1000)
    it.current = setInterval(()=>{
        setCount(count=>count+1)
    },1000)
  },[])
  useEffect(()=>{
    if(count>=10){
      // clearInterval(it)
      clearInterval(it.current)
    }
  })
  return(
    <div>
      <button onClick={()=>setCount(count+1)}>count:{count},double:{double}</button>
      <Count count={double} onClick={onClick} ref={countRef}/>
    </div>
  )
}
class Count extends PureComponent{
  speak(){
    console.log(`hello count is ${this.props.count}`)
  }
  render(){
    const {props} = this;
    return <h1 onClick={props.onClick}>{props.count}</h1>  
  }
}
// const Count = memo(function Count(props){
//   console.log("render count")
//   return <h1 onClick={props.onClick}>{props.count}</h1>  
// })
export default App;

