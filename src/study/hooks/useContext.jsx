import React, { Component, useState,createContext,useContext } from 'react';
const CountContext = createContext()
function App(){
  const [count,setCount] = useState(0)
  return(
    <div>
      <button onClick={()=>setCount(count+1)}>count:{count}</button>
      <CountContext.Provider value={count}>
        <Child/>
        <ChildType/>
        <Count/>
      </CountContext.Provider>
    </div>
  )
}
class Child extends Component{
    render(){
    return (
      <CountContext.Consumer>
        {count=><h1>{count}</h1>}
      </CountContext.Consumer>
    )    
  } 
}
class ChildType extends Component{
 static contextType = CountContext
  render(){
    const count = this.context
    return (
      <h1>{count}</h1>
    )    
} 
}
function Count(){
  const count = useContext(CountContext)
  return <h1>{count}</h1>  
}
export default App;

