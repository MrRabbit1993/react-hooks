import React, { Component, useState,useMemo,memo,useCallback} from 'react';
function App(){
  const [count,setCount] = useState(0)
  const double = useMemo(()=>{//这里可以控制是否重新计算了
    return count * 2
  },[count===3])
  // const onClick = ()=>{//这种会引发Count重新渲染，因为句柄变化了
  //   console.log(123)
  // }
  //需要改写成
  // const onClick = useMemo(()=>{
  //   return ()=>{
  //     console.log(123)
  //   }
  // },[])
  //当useMemo返回的是一个函数，可以改写useCallback
  //useMemo(()=>fn)等价于useCallBack(fn)
  const onClick = useCallback(()=>{
    console.log(123)
  },[])
  return(
    <div>
      <button onClick={()=>setCount(count+1)}>count:{count},double:{double}</button>
      <Count count={double} onClick={onClick}/>
    </div>
  )
}
const Count = memo(function Count(props){
  console.log("render count")
  return <h1 onClick={props.onClick}>{props.count}</h1>  
})
export default App;

