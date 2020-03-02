import React, { Component, PureComponent, memo } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  state = {
    num: 0,
    person: {
      age: 18
    }
  }
  render() {
    const person = this.state.person
    return (
      <div>
        <button onClick={() => {
          person.age++
          this.setState({ person: person })
        }}>点击</button>
        <Foo name="Foo"></Foo>
      </div>
    )
  }
}
// class Foo extends Component{
//   shouldComponentUpdate(nextProps,nextState){
//     if(nextProps.name===this.props.name)return false
//     return true
//   }
//   render (){
//     console.log("foo")
//     return null

//   }
// }
// class Foo extends PureComponent{
//   render (){
//     console.log("foo")
//     return null

//   }
// }
const Foo = memo(function Foo(props) {
  console.log("hello")
  return <div>{props.age}</div>
})
export default App;
