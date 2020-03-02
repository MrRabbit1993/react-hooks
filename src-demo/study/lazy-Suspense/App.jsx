import React, { Component, lazy, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';


const About = lazy(() => import("./About.jsx"));
class App extends Component {
  render() {
    return (
      <Suspense fallback={<div>loading</div>}>
        <About />
      </Suspense>
    )
  }
}
export default App;
