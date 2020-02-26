import React, { Component, useState } from 'react';
function App() {
  const [count,setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(1)}>按钮{count}</button>
    </div>
  )
}
export default App;
