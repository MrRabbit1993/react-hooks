import React, { Component, PureComponent, memo } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  state = {
    size:[window.innerWidth,window.innerHeight]
  }
  onResize = ()=>{
    this.setState({
      size:[window.innerWidth,window.innerHeight]
    })
  }
  componentDidMount(){
    window.addEventListener("resize",this.onResize);
    document.title = this.state.size.join("X")
  }
  componentWillUpdate(){
    document.title = this.state.size.join("X")
  }
  componentWillUnmount(){
    window.removeEventListener("resize",this.onResize)
  }
  render() {
    const [width,height] = this.state.size;
    return<div> {width}X{height}</div>
  }
}

export default App;
