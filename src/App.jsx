import React, { Component, createContext } from 'react';
import logo from './logo.svg';
import './App.css';

const BatteryContext = createContext();
const OnlineContext = createContext();
// function App() {

//   return (
//     <BatteryContext.Provider value={60}>
//       <Middle />
//     </BatteryContext.Provider>
//   );
// }
// function Middle() {
//   return <Last />
// }

// function Last() {
//   return (
//     <BatteryContext.Consumer>
//       {battery => <h1>battery:{battery}</h1>}
//     </BatteryContext.Consumer>
//   )
// }

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
    return <Last />
  }
}
class Last extends Component {
  static contextType = BatteryContext;
  render() {
    const battery = this.context;
    return <h1>battery:{battery}</h1>
  }
}
export default App;
