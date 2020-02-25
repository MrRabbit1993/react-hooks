import React, { Component, createContext } from 'react';
import logo from './logo.svg';
import './App.css';

const BatteryContext = createContext();
const OnlineContext = createContext();

class App extends Component {
  state = { battery: 60, online: false }
  render() {
    const { battery, online } = this.state;
    return (
      <BatteryContext.Provider value={battery}>
        <OnlineContext.Provider value={online}>
          <button onClick={() => {
            this.setState({ battery: battery - 1 })
          }}>按钮</button>
          <button onClick={() => {
            this.setState({ online: !online })
          }}>按钮1</button>
          <Middle />
        </OnlineContext.Provider>
      </BatteryContext.Provider>
    )
  }
}
class Middle extends Component {
  render() {
    return <Last1 />
  }
}
class Last extends Component {
  render() {
    return (
      <BatteryContext.Consumer>
        {battery => (
          <OnlineContext.Consumer>
            {online => <h1>battery:{battery},online:{String(online)}</h1>}
          </OnlineContext.Consumer>
        )}
      </BatteryContext.Consumer>
    )
  }
}
class Last1 extends Component {
    static contextType = BatteryContext;//静态属性
    render() {
      const battery = this.context;
      return <h1>battery:{battery}</h1>
    }
  }
export default App;
