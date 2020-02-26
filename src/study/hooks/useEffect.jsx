import React, { Component, useState,useEffect } from 'react';
class App extends Component {
  state = {
    count:0,
    size:{
      width:window.innerWidth,
      height:window.innerHeight
    }
  }
  onResize = ()=>{
   this.setState({
      size:{
        width:window.innerWidth,
        height:window.innerHeight
      }
    })
  }
  componentDidMount(){
    document.title = this.state.count;
    window.addEventListener("resize",this.onResize);
  }
  componentDidUpdate(){
    document.title = this.state.count;
  }
  componentWillUnmount(){
    window.removeEventListener("resize",this.onResize)
  }
  render() {
    const {width,height} = this.state.size;
  return<button onClick={()=>this.setState({count:this.state.count+1})}> count:{this.state.count},屏幕{width}X{height}</button>
  }
} 
function App_(){
  const [count,setCount] = useState(0)
  const [size,setSize] = useState({width:window.innerWidth,height:window.innerHeight})
  const onResize = ()=>{
    setSize({width:window.innerWidth,height:window.innerHeight})
  }
  const Click = ()=>{
    console.log("123")
  }
  useEffect(()=>{//渲染后（包含componentDidUpdate,componentWillUpdate这两个什么周期）这里会一直调用
    document.title = count
  })
  useEffect(()=>{//代表 componentDidMount componentWillUnmount 这里调用一次
    window.addEventListener("resize",onResize)
    return ()=>{
      window.removeEventListener("resize",onResize)
    }
  },[])//这里传递一个空数组 。在调用的时候，会区分这次与上一次是否一样，一样就不会调用，上面的代码没传。默认都会调用
  useEffect(()=>{
    console.log("count",count)
  },[count])//这里当count变化，就会执行，如果只修改浏览器，因为count不变，就不会执行
  useEffect(()=>{
    document.querySelector("#log").addEventListener("click",Click)
    return  ()=>{
      document.querySelector("#log").removeEventListener("click",Click)
    }
  })//这里dom在变化，所以需要每次绑定最新的，并解绑之前的
  return(
    <div>
      <button onClick={()=>setCount(count+1)}>count:{count},屏幕{size.width}X{size.height}</button>
      {count%2?<span id="log">{size.width}X{size.height}</span>:<p id="log">{size.width}X{size.height}</p>}
    </div>
  )
}
export default App_;

