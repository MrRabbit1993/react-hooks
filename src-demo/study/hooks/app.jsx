import React, { Component,useState} from 'react';
class App1 extends Component {
  state = {
    count:0
  }
  render() {
    const {count} = this.state;
    return (
      <div>
        <button onClick={()=>this.setState({count:count+1})}>按钮{count}</button>
      </div>
    )
  }
}

function App(){
  const [count,setCount] = useState(0)
  return (
    <div>
      <button onClick={()=>setCount(count+1)}>按钮{count}</button>
    </div>
  )
}

function App2() {
  const [count,setCount] = useState(0);
  const [name,setName] = useState("nike")
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>按钮{count},名称{name}</button>
    </div>
  )
}
function App3() {
    const [count,setCount] = useState(0);
    const [name,setName] = useState("nike")
    
    return (
      <div>
        <button onClick={() => {setCount(count + 1);setName("小王")}}>按钮{count},名称{name}</button>
      </div>
    )
  }
export default App;
